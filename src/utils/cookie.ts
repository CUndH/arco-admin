// @ts-ignore
import Cookies from 'js-cookie';

const doc = document;

export default {
  /**
   * Set a cookie item
   * @method set
   * @static
   * @param {String} name Cookie name
   * @param {*} value Cookie value
   * @param {String} [domain=fullDomain] The domain cookie store in
   * @param {String} [path=currentPath] The path cookie store in
   * @param {Date} [expires=sessionTime] The expire time of cookie
   * @return {Object} this (chainable)
   */
  set(name: string, value: any, domain: string, path: string, expires: number) {
    let expiresDate = new Date();
    if (expires) {
      expiresDate = new Date(+new Date() + expires);
    }

    const tempcookie = `${name
    }=${escape(value)
    }${expiresDate ? `; expires=${expiresDate.toUTCString()}` : ''
    }${path ? `; path=${path}` : ''
    }${domain ? `; domain=${domain}` : ''}`;

    // Ensure the cookie's size is under the limitation
    if (tempcookie.length < 4096) {
      Cookies.set(name, value, {
        expires: expiresDate,
        path,
        domain,
      });
    }

    return this;
  },

  /**
   * Get value of a cookie item
   * @method get
   * @static
   * @param {String} name Cookie name
   * @return {String|Null}
   */
  get(name: string) {
    return Cookies.get(name);
  },

  /**
   * Delete a cookie item
   * @method del
   * @static
   * @param {String} name Cookie name
   * @param {String} [domain=fullDomain] The domain cookie store in
   * @param {String} [path=currentPath] The path cookie store in
   * @return {Object} this (chainable)
   */
  del(name: string, domain: string, path: string) {
    return Cookies.remove(name, {
      path,
      domain,
    });
  },

  /*
   * Find certain string in cookie with regexp
   * @method find
   * @static
   * @param {RegExp} pattern
   * @return {Array|Null} RegExp matches
   * @example
   *      // assume cookie is like below
   *      // ts_uid=5458535332; ptui_loginuin=mice530@qq.com; Hm_lvt_bb8beb2d26e5d753995874b8b827291d=1367826377,1369234241;
   *      Cookie.find(/ptui_loginuin=([\S]*);/); // returns ["ptui_loginuin=mice530@qq.com;", "mice530@qq.com"]
   */
  find(pattern: RegExp) {
    return doc.cookie.match(pattern);
  },
};
