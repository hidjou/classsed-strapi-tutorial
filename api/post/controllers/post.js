"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    const user = ctx.state.user.id;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.post.create({ ...data, user }, { files });
    } else {
      entity = await strapi.services.post.create({ ...ctx.request.body, user });
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
