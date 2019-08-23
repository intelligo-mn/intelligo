import { Observable, from } from 'rxjs';
import * as scrapeIt from 'scrape-it';
import * as puppeteer from 'puppeteer';
import { JsonDB } from 'node-json-db';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import ILogger from '../../common/interfaces/ilogger';
import { IScraper, ScrapeData } from '../interfaces';

const supportedCountries = ['US', 'IN'];
const supportedMarketPlaces = ['AMAZON'];

const marketplaceConfig = [
  {
    marketplace: 'AMAZON',
    country: 'IN',
    url: 'https://www.amazon.in/dp/'
  },
  {
    marketplace: 'AMAZON',
    country: 'US',
    url: 'https://www.amazon.com/dp/'
  },
  {
    marketplace: 'FLIPKART',
    country: 'IN',
    url: 'https://www.flipkart.com/'
  }
];

const amazonConfig = {
  title: '#productTitle',
  salePrice: 'tr#priceblock_ourprice_row td.a-span12 span#priceblock_ourprice',
  salePriceDesc: 'tr#priceblock_ourprice_row span.a-size-small.a-color-price',
  dealPrice: 'span#priceblock_dealprice',
  sellerPrice: {
    selector: 'div#toggleBuyBox span.a-color-price',
    convert: x => {
      if (x.charAt(0) === '$') {
        return x.slice(1);
      }
      return x;
    }
  },
  mrpPrice: 'div#price span.a-text-strike',
  savings: 'tr#regularprice_savings td.a-span12.a-color-price.a-size-base',
  brand: 'div#bylineInfo_feature_div a#bylineInfo',
  vat: 'tr#vatMessage',
  availiability: 'div#availability',
  vnv: 'div#vnv-container',
  features: {
    listItem: 'div#feature-bullets ul li',
    name: 'features',
    data: {
      feature: 'span.a-list-item'
    }
  },
  images: {
    listItem: 'div#imageBlock div#altImages ul li',
    name: 'altImages',
    data: {
      url: {
        selector: 'img',
        attr: 'src',
        convert: x => x.replace(/_[S][A-Z][0-9][0-9]_./g, '')
      }
    }
  },
  brandUrl: {
    selector: 'div#bylineInfo_feature_div a#bylineInfo',
    attr: 'href'
  },

  image: {
    selector: 'img#landingImage',
    attr: 'src'
  }
};

const flipkartConfig = {
  title: '._35KyD6',
  salePrice: {
    selector: '._1vC4OE._3qQ9m1',
    convert: x => {
      if (x) {
        return x.replace(/\D/g, '');
      }
      return x;
    }
  },
  salePriceDesc: '#tobedone',
  dealPrice: '#tobedone',
  sellerPrice: {
    selector: '#tobedone',
    convert: x => {
      if (x.charAt(0) === '$') {
        return x.slice(1);
      }
      return x;
    }
  },
  mrpPrice: {
    selector: '._3auQ3N._1POkHg',
    convert: x => {
      if (x) {
        return x.replace(/\D/g, '');
      }
      return x;
    }
  },
  savings: {
    selector: '.VGWI6T._1iCvwn span',
    convert: x => {
      if (x) {
        return x.replace(/\D/g, '');
      }
      return x;
    }
  },
  brand:
    '._3Rrcbo > ._2RngUh:nth-child(2) table tbody > tr:nth-child(1) ul> li._3YhLQA',
  vat: '#tobedone',
  availiability: 'div.mBwvBe',
  availiabilityMessage: 'div._37bjSl', //For Flipkart
  vnv: '#tobedone',
  features: {
    listItem: '#tobedone',
    name: 'features',
    data: {
      feature: '#tobedone'
    }
  },
  images: {
    listItem: '._1HmYoV ._2rDnao ._3BTv9X',
    name: 'altImages',
    data: {
      url: {
        selector: 'img',
        attr: 'src',
        convert: x => x.replace(/_[S][A-Z][0-9][0-9]_./g, '')
      }
    }
  },
  brandUrl: {
    selector: '._1joEet > ._1HEvv0:nth-last-child(2) a',
    attr: 'href'
  },
  image: {
    selector: 'img._1Nyybr',
    attr: 'src'
  }
};

const defaultConfig = amazonConfig;
/**
 * Starwars Service Implementation
 */
@injectable()
class ScraperService implements IScraper {
  public loggerService: ILogger;
  public db: JsonDB;
  public dbPublish: JsonDB;
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
  }

  public getScrapedData = (url: string, headless?: string): Observable<any> => {
    return from(
      new Promise((resolve, reject) => {
        if (typeof headless !== 'undefined' && headless === 'true') {
          // console.log('using Puppeteer');
          puppeteer
            .launch()
            .then(browser => {
              return browser.newPage();
            })
            .then(page => {
              return page.goto(url).then(() => {
                return page.content();
              });
            })
            .then(html => {
              const data = scrapeIt.scrapeHTML(
                html,
                this.getConfiguration(url)
              );
              const updatedData = this.transformScrapedData(
                data,
                url,
                null,
                url
              );
              resolve(updatedData);
            })
            .catch(err => {
              this.loggerService.error(err);
              reject(err);
            });
        } else {
          // console.log('using Ajax');
          scrapeIt(url, this.getConfiguration(url)).then(
            ({ data, response }) => {
              const updatedData = this.transformScrapedData(
                data,
                url,
                null,
                url
              );
              resolve(updatedData);
            },
            error => {
              this.loggerService.error(error);
            }
          );
        }
      })
    );
  };

  public getScrapedListData = (
    { country, marketplace, baseUrl, asinList },
    withURL: boolean
  ): Observable<any> => {
    const res = asinList.split(',');
    const defaultUrl = this.getBaseURLFor(country, marketplace);
    // override country,market place if the url is provided
    const scrapeBaseUrl = typeof baseUrl !== 'undefined' ? baseUrl : defaultUrl;
    const scrapeMarketplace =
      typeof marketplace !== 'undefined'
        ? marketplace
        : this.getMarketPlace(scrapeBaseUrl);
    const scrappedList = res.map(
      asin =>
        new Promise((resolve, reject) => {
          const asinUrl = withURL ? asin : `${scrapeBaseUrl}${asin}`;
          scrapeIt(asinUrl, this.getConfiguration(asinUrl)).then(
            ({ data, response }) => {
              const updatedData = this.transformScrapedData(
                data,
                asinUrl,
                scrapeMarketplace,
                asin
              );
              resolve(updatedData);
            },
            error => {
              reject(error);
            }
          );
        })
    );

    return from(
      new Promise((resolve, reject) =>
        Promise.all(scrappedList).then(
          values => resolve(values),
          error => reject(error)
        )
      )
    );
  };

  public push(name: string, data: any, replace?: boolean): Observable<any> {
    this.initDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          this.loggerService.info(name);

          if (replace) {
            this.db.push(`/${name}`, { ...data });
            resolve(data);
            return;
          }

          // current scraped data
          let currentData = null;
          // New updates
          const newData = data.data;
          try {
            // Check if an entry exists
            currentData = this.db.getData(`/${name}/`);
          } catch (error) {}

          // If exists
          if (currentData !== null && currentData.data !== null) {
            newData.map(elem => {
              const index = currentData.data.findIndex(
                item =>
                  item.title === elem.title &&
                  item.marketplace === elem.marketplace
              );
              // Update existing entries
              if (index > -1) {
                currentData.data[index] = elem;
              } else {
                // Add new entry
                currentData.data.push(elem);
              }
            });
          } else {
            // No previous entry to use as is
            currentData = data;
          }

          /*           if (allData) {
            currentData = {
              ...currentData,
              ...data,
              data: currentData.data
            }
          } */

          this.db.push(`/${name}`, { ...currentData });
          resolve(newData);
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  public pushProduct(name: string, data: any): Observable<any> {
    this.initDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          this.loggerService.info(name);
          let currentData = null;
          // Check if preview values exist
          try {
            currentData = this.db.getData(`/${name}/data/`);
          } catch (error) {}
          const { title, marketplace } = data.data;
          const index =
            currentData === null
              ? -1
              : currentData.findIndex(
                  item =>
                    item.title === title && item.marketplace === marketplace
                );
          // If exist overwrite value
          if (index > -1) {
            this.db.push(`/${name}/data[${index}]/`, { ...data.data });
          } else {
            // Create new entry / append
            this.db.push(`/${name}/data[]/`, { ...data.data });
          }

          resolve(data);
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          // console.log('Got an Error');
          reject(error);
        }
      })
    );
  }

  public deleteMicrositeByID(name: string): Observable<any> {
    this.initDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          this.loggerService.info(name);
          this.db.getData(`/${name}`);
          this.db.delete(`/${name}`);
          resolve({ message: `Campaign ${name} deleted` });
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  public deleteMicrositePublishByID(name: string): Observable<any> {
    this.initPublishDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          this.loggerService.info(name);
          this.dbPublish.getData(`/${name}`);
          this.dbPublish.delete(`/${name}`);
          resolve({ message: `Campaign Publish record: ${name} deleted` });
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  public byMicrositeByID(name: string): Observable<any> {
    this.initDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          this.loggerService.info(name);
          const data = this.db.getData(`/${name}`);
          this.loggerService.info(data);
          resolve(data);
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  public getAll(): Observable<any> {
    this.initDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          const data = this.db.getData(`/`);
          this.loggerService.info(data);
          resolve(data);
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  public getAllSites(): Observable<any> {
    this.initPublishDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          const data = this.dbPublish.getData(`/`);
          this.loggerService.info(data);
          resolve(data);
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  public pushSite(name: string, data: string): Observable<any> {
    this.initPublishDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          this.loggerService.info(name);
          this.dbPublish.push(`/${name}`, data);
          resolve(data);
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  public byPublishedMicrositeByID(name: string): Observable<any> {
    this.initPublishDb();
    return from(
      new Promise((resolve, reject) => {
        try {
          this.loggerService.info(name);
          const data = this.dbPublish.getData(`/${name}`);
          this.loggerService.info(data);
          resolve(data);
        } catch (error) {
          // The error will tell you where the DataPath stopped. In this case test1
          // Since /test1/test does't exist.
          reject(error);
        }
      })
    );
  }

  private transformScrapedData = (data, url, marketPlace?, id?): any => {
    const scrapeMarketplace = marketPlace
      ? marketPlace
      : this.getMarketPlace(url);
    const scrapedData: any = data;
    const { dealPrice, salePrice, sellerPrice } = scrapedData;
    // if there is a deal then show that
    if (dealPrice.length > 0) {
      scrapedData.salePrice = dealPrice;
    } else if (
      // if sale price and deal price
      // are not available then fall back
      // on seller price
      salePrice.length === 0 &&
      dealPrice.length === 0 &&
      sellerPrice.length > 0
    ) {
      scrapedData.salePrice = sellerPrice;
    }

    const updatedData = {
      ...scrapedData,
      id,
      scrapedUrl: url,
      marketplace: scrapeMarketplace,
      scrapeDate: new Date()
    };
    return updatedData;
  };

  private initDb = () => {
    if (this.db === undefined) {
      this.db = new JsonDB('productsDB', true, false);
    }
  };

  private initPublishDb = () => {
    if (this.dbPublish === undefined) {
      this.dbPublish = new JsonDB('publishDB', true, false);
    }
  };

  private getConfiguration = (url: string) => {
    if (url.toUpperCase().includes('AMAZON')) {
      return amazonConfig;
    } else if (url.toUpperCase().includes('FLIPKART')) {
      return flipkartConfig;
    } else {
      return defaultConfig;
    }
  };

  private getMarketPlace = (url: string) => {
    let defaultMarketPlace = 'Amazon';
    if (url.toUpperCase().includes('FLIPKART')) {
      defaultMarketPlace = 'Flipkart';
    }

    return defaultMarketPlace;
  };

  /**
   * Get the base URL based on the country and marketplace
   * In the country or marketplace are not supported return the default
   * url based on amazon india
   */
  private getBaseURLFor = (country: string, marketplace: string) => {
    let currentMarketPlace = 'AMAZON';
    let currentCountry = 'IN';
    const defaultURL = 'https://www.amazon.in/dp/';

    if (
      typeof marketplace !== 'undefined' &&
      supportedMarketPlaces.indexOf(marketplace.toUpperCase()) > -1
    ) {
      currentMarketPlace = marketplace.toUpperCase();
    }

    if (
      typeof country !== 'undefined' &&
      supportedCountries.indexOf(country.toUpperCase()) > -1
    ) {
      currentCountry = country.toUpperCase();
    }
    const marketplaceInfo = marketplaceConfig.find(
      item =>
        item.country === currentCountry &&
        item.marketplace === currentMarketPlace
    );

    return typeof marketplaceInfo !== 'undefined'
      ? marketplaceInfo.url
      : defaultURL;
  };
}

export default ScraperService;
