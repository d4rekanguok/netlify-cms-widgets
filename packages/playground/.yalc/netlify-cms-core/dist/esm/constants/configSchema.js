"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConfig = validateConfig;

var _ajv = _interopRequireDefault(require("ajv"));

var _ajvErrors = _interopRequireDefault(require("ajv-errors"));

var _formats = require("../formats/formats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

/**
 * Config for fields in both file and folder collections.
 */
const fieldsConfig = {
  type: 'array',
  minItems: 1,
  items: {
    // ------- Each field: -------
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      label: {
        type: 'string'
      },
      widget: {
        type: 'string'
      },
      required: {
        type: 'boolean'
      }
    },
    required: ['name']
  }
};
/**
 * The schema had to be wrapped in a function to
 * fix a circular dependency problem for WebPack,
 * where the imports get resolved asynchronously.
 */

const getConfigSchema = () => ({
  type: 'object',
  properties: {
    backend: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          examples: ['test-repo']
        },
        auth_scope: {
          type: 'string',
          examples: ['repo', 'public_repo'],
          enum: ['repo', 'public_repo']
        },
        open_authoring: {
          type: 'boolean',
          examples: [true]
        }
      },
      required: ['name']
    },
    local_backend: {
      oneOf: [{
        type: 'boolean'
      }, {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            examples: ['http://localhost:8081/api/v1']
          }
        },
        required: ['url']
      }]
    },
    locale: {
      type: 'string',
      examples: ['en', 'fr', 'de']
    },
    site_url: {
      type: 'string',
      examples: ['https://example.com']
    },
    display_url: {
      type: 'string',
      examples: ['https://example.com']
    },
    logo_url: {
      type: 'string',
      examples: ['https://example.com/images/logo.svg']
    },
    show_preview_links: {
      type: 'boolean'
    },
    media_folder: {
      type: 'string',
      examples: ['assets/uploads']
    },
    public_folder: {
      type: 'string',
      examples: ['/uploads']
    },
    media_folder_relative: {
      type: 'boolean'
    },
    media_library: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          examples: ['uploadcare']
        },
        config: {
          type: 'object'
        }
      },
      required: ['name']
    },
    publish_mode: {
      type: 'string',
      enum: ['simple', 'editorial_workflow'],
      examples: ['editorial_workflow']
    },
    slug: {
      type: 'object',
      properties: {
        encoding: {
          type: 'string',
          enum: ['unicode', 'ascii']
        },
        clean_accents: {
          type: 'boolean'
        }
      }
    },
    collections: {
      type: 'array',
      minItems: 1,
      items: {
        // ------- Each collection: -------
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          label: {
            type: 'string'
          },
          label_singular: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          folder: {
            type: 'string'
          },
          files: {
            type: 'array',
            items: {
              // ------- Each file: -------
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                label: {
                  type: 'string'
                },
                label_singular: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                },
                file: {
                  type: 'string'
                },
                fields: fieldsConfig
              },
              required: ['name', 'label', 'file', 'fields']
            }
          },
          identifier_field: {
            type: 'string'
          },
          summary: {
            type: 'string'
          },
          slug: {
            type: 'string'
          },
          path: {
            type: 'string'
          },
          preview_path: {
            type: 'string'
          },
          preview_path_date_field: {
            type: 'string'
          },
          create: {
            type: 'boolean'
          },
          editor: {
            type: 'object',
            properties: {
              preview: {
                type: 'boolean'
              }
            }
          },
          format: {
            type: 'string',
            enum: Object.keys(_formats.formatExtensions)
          },
          extension: {
            type: 'string'
          },
          frontmatter_delimiter: {
            type: ['string', 'array'],
            minItems: 2,
            maxItems: 2,
            items: {
              type: 'string'
            }
          },
          fields: fieldsConfig
        },
        required: ['name', 'label'],
        oneOf: [{
          required: ['files']
        }, {
          required: ['folder', 'fields']
        }],
        if: {
          required: ['extension']
        },
        then: {
          // Cannot infer format from extension.
          if: {
            properties: {
              extension: {
                enum: Object.keys(_formats.extensionFormatters)
              }
            }
          },
          else: {
            required: ['format']
          }
        },
        dependencies: {
          frontmatter_delimiter: {
            properties: {
              format: {
                enum: _formats.frontmatterFormats
              }
            },
            required: ['format']
          }
        }
      }
    }
  },
  required: ['backend', 'collections'],
  anyOf: [{
    required: ['media_folder']
  }, {
    required: ['media_library']
  }]
});

class ConfigError extends _extendableBuiltin(Error) {
  constructor(errors, ...args) {
    const message = errors.map(({
      message,
      dataPath
    }) => {
      const dotPath = dataPath.slice(1).split('/').map(seg => seg.match(/^\d+$/) ? "[".concat(seg, "]") : ".".concat(seg)).join('').slice(1);
      return "".concat(dotPath ? "'".concat(dotPath, "'") : 'config', " ").concat(message);
    }).join('\n');
    super(message, ...args);
    this.errors = errors;
    this.message = message;
  }

  toString() {
    return this.message;
  }

}
/**
 * `validateConfig` is a pure function. It does not mutate
 * the config that is passed in.
 */


function validateConfig(config) {
  const ajv = new _ajv.default({
    allErrors: true,
    jsonPointers: true
  });
  (0, _ajvErrors.default)(ajv);
  const valid = ajv.validate(getConfigSchema(), config);

  if (!valid) {
    console.error('Config Errors', ajv.errors);
    throw new ConfigError(ajv.errors);
  }
}