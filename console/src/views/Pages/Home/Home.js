import React, {Component} from 'react';

class Home extends Component {
  render() {
    return (
       <main className="techstar-main is-theme-dark">

          <div className="techstar-main__pages u-absolute u-pos-tl u-fit js-main-pages is-visible">
              <div className="techstar-pages u-absolute u-fit u-pos-tl" style={{transform: 'translateX(-17.1px) translateY(2.1px) translateZ(0px)'}}>
                  <div className="techstar-page techstar-home u-absolute u-fit u-pos-tl is-page-active" id="particles-js">
                      <div className="techstar-page__inner">
                          <div className="techstar-title techstar-home__title u-uppercase u-align-center is-visible is-optimized">Techstar AI Platform.</div>
                          <div className="techstar-paragraph techstar-home__description u-align-center is-visible has-translate-y">
                              <div className="techstar-paragraph__line has-index-0 has-inverse-index-1">
                                  <span className="techstar-paragraph__char">Techstar is a conversational AI platform powering virtual assistants and </span>
                              </div>
                              <div className="techstar-paragraph__line has-index-1 has-inverse-index-0">
                                  <span className="techstar-paragraph__char">smart bots across mobile apps, web and messaging platforms.</span>
                              </div>
                          </div>
                          <div className="techstar-home__buttons">
                              <a href="/login" className="techstar-home-button is-ios o-glitch-hover o-glitch-hover--default u-inline-block u-relative">
                                  <span className="o-glitch-hover__letter is-letter">L</span>
                                  <span className="o-glitch-hover__letter is-letter">O</span>
                                  <span className="o-glitch-hover__letter is-letter">G</span>
                                  <span className="o-glitch-hover__letter is-letter">I</span>
                                  <span className="o-glitch-hover__letter is-letter">N</span>
                                  <span className="techstar-home-button__border u-absolute u-pos-tl u-fit"></span>
                                  <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhbHF1ZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMy42IDUuOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMy42IDUuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNDQUJBQzA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cG9seWxpbmUgY2xhc3M9InN0MCIgcG9pbnRzPSIwLjQsMC40IDIuOSwyLjkgMC40LDUuNCAiLz4KPC9zdmc+Cg=="
                                      width="4" height="6" className="techstar-home-button__arrow u-inline-block u-absolute"></img>
                              </a>
                              <br className="techstar-home__buttons-line-break"></br>
                              <a href="https://github.com/techstar-cloud" target="_blank" className="techstar-home-button is-android o-glitch-hover o-glitch-hover--default u-inline-block u-relative">
                                  <span className="o-glitch-hover__letter is-letter">G</span>
                                  <span className="o-glitch-hover__letter is-letter">I</span>
                                  <span className="o-glitch-hover__letter is-letter">T</span>
                                  <span className="o-glitch-hover__letter is-letter">H</span>
                                  <span className="o-glitch-hover__letter is-letter">U</span>
                                  <span className="o-glitch-hover__letter is-letter">B</span>
                                  <span className="techstar-home-button__border u-absolute u-pos-tl u-fit"></span>
                                  <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhbHF1ZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMy42IDUuOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMy42IDUuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNDQUJBQzA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cG9seWxpbmUgY2xhc3M9InN0MCIgcG9pbnRzPSIwLjQsMC40IDIuOSwyLjkgMC40LDUuNCAiLz4KPC9zdmc+Cg=="
                                      width="4" height="6" className="techstar-home-button__arrow u-inline-block u-absolute"></img>
                              </a>
                          </div>
                      </div>
                      <a href="/console" className="techstar-home-discover u-inline-block u-absolute o-glitch-hover o-glitch-hover--default">
                          <span className="techstar-home-discover__label u-inline-block">
                         
                              <span className="o-glitch-hover__letter is-letter"> © </span>
                              <span className="o-glitch-hover__letter is-letter">2</span>
                              <span className="o-glitch-hover__letter is-letter">0</span>
                              <span className="o-glitch-hover__letter is-letter">1</span>
                              <span className="o-glitch-hover__letter is-letter">8</span>
                              <span className="o-glitch-hover__letter is-letter"> </span>
                              <span className="o-glitch-hover__letter is-letter"> </span>
                              <span className="o-glitch-hover__letter is-letter">T</span>
                              <span className="o-glitch-hover__letter is-letter">E</span>
                              <span className="o-glitch-hover__letter is-letter">C</span>
                              <span className="o-glitch-hover__letter is-letter">H</span>
                              <span className="o-glitch-hover__letter is-letter">S</span>
                              <span className="o-glitch-hover__letter is-letter">T</span>
                              <span className="o-glitch-hover__letter is-letter">A</span>
                              <span className="o-glitch-hover__letter is-letter">R</span>
                              <span className="o-glitch-hover__letter is-letter">, </span>
                              <span className="o-glitch-hover__letter is-letter">I</span>
                              <span className="o-glitch-hover__letter is-letter">N</span>
                              <span className="o-glitch-hover__letter is-letter">C</span>
                              <span className="o-glitch-hover__letter is-letter">.</span>
                          </span>
                      </a>
                  </div>
              </div>
          </div>
          <div className="techstar-main__ui">
              
              <div className="techstar-main__no-nav-ui">
                  <a href="/menu" className="techstar-menu-trigger u-fixed">
                      <span className="techstar-menu-trigger__inner techstar-menu-trigger__inner--light u-block u-absolute u-fit">
                          <span className="techstar-menu-trigger__dots u-block u-absolute">
                              <span className="techstar-menu-trigger__dots-inner u-block u-absolute">
                                  <span className="techstar-menu-trigger__dot has-index-0 u-block u-absolute"></span>
                                  <span className="techstar-menu-trigger__dot has-index-1 u-block u-absolute"></span>
                                  <span className="techstar-menu-trigger__dot has-index-2 u-block u-absolute"></span>
                              </span>
                          </span>
                          <span className="techstar-menu-trigger__cross u-block u-absolute">
                              <span className="techstar-menu-trigger__cross-bar has-index-0 u-block u-absolute"></span>
                              <span className="techstar-menu-trigger__cross-bar has-index-1 u-block u-absolute"></span>
                          </span>
                          <span className="techstar-menu-trigger__circles u-block u-absolute">
                              <span className="techstar-menu-trigger__circles-scaler u-block u-absolute">
                                  <span className="techstar-menu-trigger__circles-inner u-block u-absolute">
                                      <span className="techstar-menu-trigger__circle has-index-0 u-block u-absolute">
                                          <span className="techstar-menu-trigger__circle-inner u-block u-absolute u-overflow-h">
                                              <span className="techstar-menu-trigger__circle-border u-block u-absolute"></span>
                                          </span>
                                      </span>
                                      <span className="techstar-menu-trigger__circle has-index-1 u-block u-absolute">
                                          <span className="techstar-menu-trigger__circle-inner u-block u-absolute u-overflow-h">
                                              <span className="techstar-menu-trigger__circle-border u-block u-absolute"></span>
                                          </span>
                                      </span>
                                  </span>
                              </span>
                          </span>
                      </span>
                  </a>
                  <span className="techstar-more u-block u-absolute">
                      <div className="techstar-more__inner techstar-more__inner--light u-absolute u-fit">
                          <span className="techstar-more__elements u-relative u-inline-block">
                              
                              <span className="u-hide@xxs">
                                  <span className="techstar-more__pipe u-inline-block"></span>
                                  <span className="techstar-more__website">
                                      <span className="u-hide@md">Powered</span> by </span>
                                  <a href="http://techstar.cloud/" className="o-glitch-hover o-glitch-hover--default">
                                      <span className="o-glitch-hover__letter is-letter"> </span>
                                      <span className="o-glitch-hover__letter is-letter">T</span>
                                      <span className="o-glitch-hover__letter is-letter">e</span>
                                      <span className="o-glitch-hover__letter is-letter">c</span>
                                      <span className="o-glitch-hover__letter is-letter">h</span>
                                      <span className="o-glitch-hover__letter is-letter">s</span>
                                      <span className="o-glitch-hover__letter is-letter">t</span>
                                      <span className="o-glitch-hover__letter is-letter">a</span>
                                      <span className="o-glitch-hover__letter is-letter">r</span>
                                      <span className="o-glitch-hover__letter is-letter"> </span>
                                      <span className="o-glitch-hover__letter is-letter">P</span>
                                      <span className="o-glitch-hover__letter is-letter">L</span>
                                      <span className="o-glitch-hover__letter is-letter">A</span>
                                      <span className="o-glitch-hover__letter is-letter">T</span>
                                      <span className="o-glitch-hover__letter is-letter">F</span>
                                      <span className="o-glitch-hover__letter is-letter">O</span>
                                      <span className="o-glitch-hover__letter is-letter">R</span>
                                      <span className="o-glitch-hover__letter is-letter">M</span>
                                  </a>
                              </span>
                          </span>
                          <span className="techstar-more__icon u-inline-block u-absolute">
                              <span className="techstar-more__icon-bar has-index-0 u-absolute u-block"></span>
                              <span className="techstar-more__icon-bar has-index-1 u-absolute u-block"></span>
                          </span>
                      </div>
                      <div className="techstar-more__inner techstar-more__inner--dark u-absolute u-fit">
                      </div>
                  </span>
              </div>
              <a href="#" className="techstar-audio u-absolute u-inline-block is-active is-visible has-theme-light">
                  <span className="techstar-audio__inner u-absolute u-block u-fit u-pos-tl">
                      <span className="techstar-audio__bar has-index-0 u-block u-absolute"></span>
                      <span className="techstar-audio__bar has-index-1 u-block u-absolute"></span>
                      <span className="techstar-audio__bar has-index-2 u-block u-absolute"></span>
                      <span className="techstar-audio__bar has-index-3 u-block u-absolute"></span>
                      <span className="techstar-audio__bar has-index-4 u-block u-absolute"></span>
                  </span>
              </a>
          </div>
  
      </main>

    );
  }
}

export default Home;
