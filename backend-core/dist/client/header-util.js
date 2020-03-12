"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const applicationName = config_1.config.get('jhipster.clientApp.name');
const enableTranslation = true;
class HeaderUtil {
    static createAlert(res, message, param) {
        res.set('X-' + applicationName + '-alert', message);
        res.set('X-' + applicationName + '-params', param);
    }
    static addEntityCreatedHeaders(res, entityName, param) {
        res.status(201);
        const message = enableTranslation
            ? applicationName + '.' + entityName + '.created'
            : 'A new ' + entityName + ' is created with identifier ' + param;
        this.createAlert(res, message, param);
    }
    static addEntityUpdatedHeaders(res, entityName, param) {
        const message = enableTranslation
            ? applicationName + '.' + entityName + '.updated'
            : 'A ' + entityName + ' is updated with identifier ' + param;
        this.createAlert(res, message, param);
    }
    static addEntityDeletedHeaders(res, entityName, param) {
        res.status(204);
        const message = enableTranslation
            ? applicationName + '.' + entityName + '.deleted'
            : 'A ' + entityName + ' is deleted with identifier ' + param;
        this.createAlert(res, message, param);
    }
    static addPaginationHeaders(res, page) {
        const url = res.req.url;
        res.set('X-Total-Count', page.total.toString());
        const pageNumber = page.pageable.page;
        const pageSize = page.pageable.size;
        const links = [];
        if (pageNumber < page.total - 1) {
            links.push(this.prepareLink(url, pageNumber + 1, pageSize, 'next'));
        }
        if (pageNumber > 0) {
            links.push(this.prepareLink(url, pageNumber - 1, pageSize, 'prev'));
        }
        links.push(this.prepareLink(url, page.total - 1, pageSize, 'last'));
        links.push(this.prepareLink(url, 0, pageSize, 'first'));
        res.set('Link', links.join('%2C'));
    }
    static prepareLink(url, pageNumber, pageSize, relType) {
        url = new URL('http://localhost' + url);
        url.searchParams.set('page', pageNumber);
        url.searchParams.set('size', pageSize);
        url = url.toString().replace('http://localhost', '');
        return `<${url}>%3B rel="${relType}"`;
    }
}
exports.HeaderUtil = HeaderUtil;
//# sourceMappingURL=header-util.js.map