
export const API_URL = 'https://api-eu-central-1.graphcms.com/v2/ckj0i0w0oa75301z99v5x46xw/master';

export const GET_BUILDS_QUERY = `
  query MyQuery {
    builds {
      name
      cpu {
        productName
        price
        image {
          url
        }
      }
      cooler {
        productName
        price
        image {
          url
        }
      }
      motherboard {
        productName
        price
        image {
          url
        }
      }
      memory {
        productName
        price
        image {
          url
        }
      }
      gpu {
        productName
        price
        image {
          url
        }
      }
      storage {
        productName
        price
        image {
          url
        }
      }
      psu {
        productName
        price
        image {
          url
        }
      }
      opticalDrive {
        productName
        price
        image {
          url
        }
      }
      case {
        productName
        price
        image {
          url
        }
      }
      operatingSystem {
        productName
        price
        image {
          url
        }
      }
    }
  }
`;
