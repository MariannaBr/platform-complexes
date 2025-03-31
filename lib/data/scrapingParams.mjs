// DOGPATCH

export function getParamsAvalon() {
  const params = {
    js_scenario: {
      instructions: [
        //{ wait_for_and_click: ".ant-modal-close" }, // use when there is popup modal on the webpage
        { wait_for_and_click: "[id^=load-all-units]" },
        { wait: 5000 }
      ]
    },
    wait: "35000",
    block_resources: "False",
    wait_for: ".ant-card-body",
    extract_rules: {
      apartments: {
        selector: ".ant-card-body",
        type: "list",
        output: {
          info: {
            selector: ".description"
          },
          price: {
            selector: ".unit-price"
          },
          picture: {
            selector: ".unit-img",
            output: "@src"
          },
          link: {
            selector: ".unit-item-details-title",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsMariposa() {
  const params = {
    block_resources: "False",
    wait_for: ".floorplans-panel",
    extract_rules: {
      apartments: {
        selector: ".floorplans-panel",
        type: "list",
        output: {
          info: {
            selector: ".bedbath"
          },
          area: {
            selector: ".sqft"
          },
          price: {
            selector: ".price"
          },
          picture: {
            selector: ".image-popup",
            output: "@href"
          },
          link: {
            selector: "a[title='Apply Now']",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsTenn() {
  const params = {
    stealth_proxy: "True",
    render_js: "True",
    block_resources: "False",
    premium_proxy: "True",
    wait_for: ".fp-container",
    extract_rules: {
      apartments: {
        selector: '//div[@id="floorplans-container"]/div',
        type: "list",
        output: {
          info: {
            selector: "li",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".card-body span",
            type: "item"
          },
          picture: {
            selector: ".card-img-top",
            output: "@src"
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsPotrero() {
  const params = {
    block_resources: "False",
    wait: "35000",
    wait_for: ".card",
    extract_rules: {
      apartments: {
        selector: '//input[@name="json_response"]',
        output: "@value"
      }
    }
  };
  return params;
}

export function getParamsMartin() {
  const params = {
    wait_for: ".rpfp-card",
    extract_rules: {
      apartments: {
        selector: ".rpfp-card",
        type: "list",
        output: {
          beds: {
            selector: ".rpfp-beds",
            type: "item",
            output: "text"
          },
          area: {
            selector: ".rpfp-sqft",
            type: "item",
            output: "text"
          },
          baths: {
            selector: ".rpfp-bath",
            type: "item",
            output: "text"
          },
          price: {
            selector: ".rpfp-rent",
            type: "item"
          },
          picture: {
            selector: ".rpfp-image",
            output: "@data-src"
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsGantry() {
  const params = {
    block_resources: "False",
    wait_for: ".fp-group-list",
    extract_rules: {
      apartments: {
        selector: ".fp-group-list > li",
        type: "list",
        output: {
          info: {
            selector: ".bed-bath > span",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".rent > div",
            type: "item",
            output: "text"
          },
          area: {
            selector: ".sq-feet > span",
            type: "list",
            output: "text"
          },
          picture: {
            selector: ".image-link img",
            output: "@src"
          },
          link: {
            selector: ".secondary-action",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsOAM() {
  const params = {
    js_scenario: {
      instructions: [{ wait_for_and_click: ".card-nav-btn" }, { wait: 5000 }]
    },
    wait: "5000",
    block_resources: "False",
    premium_proxy: "True",
    wait_for: ".card-container",
    extract_rules: {
      apartments: {
        selector: ".card-container",
        type: "list",
        output: {
          info: {
            selector: ".floorplan-title-meta span",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".rate-display span.title",
            type: "item"
          },
          picture: {
            selector: ".v-image__image",
            output: "@style"
          },
          link: {
            selector: ".card-cta a",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsWindsor() {
  const params = {
    wait_for: ".spaces__tab-container",
    extract_rules: {
      apartments: {
        selector: ".spaces-unit",
        type: "list",
        output: {
          beds: {
            selector: ".spaces__plan__attributes-bedcount span",
            type: "list"
          },
          baths: {
            selector: ".spaces__plan__attributes-bathcount span",
            type: "list"
          },
          area: {
            selector: ".spaces__plan__attributes-area span",
            type: "list"
          },
          price: {
            selector: ".spaces__label-price a",
            type: "item",
            output: "text"
          },
          picture: {
            selector: ".spaces__unit-media a",
            type: "list",
            output: "@href"
          },
          link: {
            selector: ".spaces__unit-cta a",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsChase() {
  const params = {
    render_js: true,
    wait: "5000",
    wait_for: ".listing-section",
    block_resources: "False",
    extract_rules: {
      apartments: {
        selector: ".listing-item",
        type: "list",
        output: {
          area: {
            selector: ".sqft"
          },
          beds: {
            selector: ".beds"
          },
          baths: {
            selector: ".baths"
          },
          price: {
            selector: ".rent"
          },
          picture: {
            selector: ".slider-images > div:nth-child(1)",
            output: "@data-background-image"
          },
          link: {
            selector: ".slider-link",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

// MISSION BAY

export function getParamsWindsorMissionBay() {
  const params = {
    wait_for: ".spaces__tab-container",
    extract_rules: {
      apartments: {
        selector: ".spaces-unit",
        type: "list",
        output: {
          beds: {
            selector: ".spaces__plan__attributes-bedcount span",
            type: "list"
          },
          baths: {
            selector: ".spaces__plan__attributes-bathcount span",
            type: "list"
          },
          area: {
            selector: ".spaces__plan__attributes-area span",
            type: "list"
          },
          price: {
            selector: ".spaces__label-price a",
            type: "item",
            output: "text"
          },
          picture: {
            selector: ".spaces__unit-media a",
            type: "list",
            output: "@href"
          },
          link: {
            selector: ".spaces__unit-cta a",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsAvalonMissionBay() {
  const params = {
    js_scenario: {
      instructions: [
        { wait_for_and_click: ".ant-modal-close" }, // use when there is popup modal on the webpage
        { wait_for_and_click: "[id^=load-all-units]" },
        { wait: 5000 }
      ]
    },
    wait: "35000",
    block_resources: "False",
    wait_for: ".ant-card-body",
    extract_rules: {
      apartments: {
        selector: ".ant-card-body",
        type: "list",
        output: {
          info: {
            selector: ".description"
          },
          price: {
            selector: ".unit-price"
          },
          picture: {
            selector: ".unit-img",
            output: "@src"
          },
          link: {
            selector: ".unit-item-details-title",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsVenue() {
  const params = {
    wait_for: ".fp-container",
    extract_rules: {
      apartments: {
        selector: '//div[@id="floorplans-container"]/div',
        type: "list",
        output: {
          info: {
            selector: "li",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".card-body span",
            type: "item"
          },
          picture: {
            selector: ".card-img-top",
            output: "@src"
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsStrata() {
  const params = {
    js_scenario: {
      instructions: [
        { wait_for_and_click: ".close" }, // use when there is popup modal on the webpage
        { wait: 5000 }
      ]
    },
    wait_for: ".fp-container",
    extract_rules: {
      apartments: {
        selector: '//div[@id="floorplans-container"]/div',
        type: "list",
        output: {
          info: {
            selector: "li",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".card-body span",
            type: "item"
          },
          picture: {
            selector: ".card-img-top",
            output: "@src"
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsAzure() {
  const params = {
    wait_for: ".unit-expanded-card",
    extract_rules: {
      apartments: {
        selector: ".unit-expanded-card",
        type: "list",
        output: {
          info: {
            selector: ".ng-binding",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".pricing",
            type: "item"
          },
          picture: {
            selector: ".floorplan-img",
            output: "@data-src"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsVerde() {
  const params = {
    wait_for: ".section-component",
    extract_rules: {
      apartments: {
        selector: '//div[@class="component section-component"]/astro-island',
        type: "list",
        output: "@props"
      }
    }
  };
  return params;
}

export function getParamsCanyon() {
  const params = {
    js_scenario: {
      instructions: [
        {
          wait_for_and_click:
            "#page_component_0 > div > div.relative.z-50 > div > section > ul > li:nth-child(2) > button"
        },
        { wait: 1000 }
      ]
    },
    block_resources: "False",
    wait_for: ".availability-component",
    extract_rules: {
      apartments: {
        selector: ".apartment-item",
        type: "list",
        output: {
          picture: {
            selector: ".image-wrapper img",
            output: "@src"
          },
          info: {
            selector: ".body-wrapper li",
            type: "list"
          },
          link: {
            selector: ".body-wrapper a",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsEdgewater() {
  const params = {
    block_resources: "False",
    wait_for: ".listings",
    extract_rules: {
      apartments: {
        selector: ".ap-unit",
        type: "list",
        output: {
          beds: {
            selector: ".unit-bed-count"
          },
          baths: {
            selector: ".unit-bath-count"
          },
          area: {
            selector: ".unit-sqft"
          },
          picture: {
            selector: ".unit-image",
            output: "@data-src"
          },
          price: {
            selector: ".details-rent-amount"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsChannel() {
  const params = {
    block_resources: "False",
    wait_for: ".listings",
    extract_rules: {
      apartments: {
        selector: ".ap-unit",
        type: "list",
        output: {
          beds: {
            selector: ".unit-bed-count"
          },
          baths: {
            selector: ".unit-bath-count"
          },
          area: {
            selector: ".unit-sqft"
          },
          picture: {
            selector: ".unit-image",
            output: "@data-src"
          },
          price: {
            selector: ".details-rent-amount"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsMb360() {
  const params = {
    wait_for: ".floor-plan-card__wrapper",
    extract_rules: {
      apartments: {
        selector: ".floor-plan-card__wrapper > div",
        type: "list",
        output: {
          info: {
            selector: ".floor-plan-card__content__size",
            output: "markdown_relevant"
          },
          picture: {
            selector: ".image-lightbox__image",
            output: "@src"
          },
          price: {
            selector: ".floor-plan-card__content__price"
          }
        }
      }
    }
  };
  return params;
}

// Rincon Hill

export function getParams333Fremont() {
  const params = {
    wait_for: ".fp-group-list",
    extract_rules: {
      apartments: {
        selector: ".fp-group-item",
        type: "list",
        output: {
          picture: {
            selector: ".image-link img",
            output: "@src"
          },
          info: {
            selector: ".bed-bath span",
            type: "list"
          },
          price: {
            selector: ".fee-transparency-text"
          },
          area: {
            selector: ".sq-feet"
          },
          link: {
            selector: ".secondary-action",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParams340Fremont() {
  const params = {
    wait_for: ".unit-expanded-card",
    extract_rules: {
      apartments: {
        selector: ".unit-expanded-card",
        type: "list",
        output: {
          info: {
            selector: ".ng-binding",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".pricing",
            type: "item"
          },
          picture: {
            selector: ".floorplan-img",
            output: "@data-src"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsSomaSquare() {
  const params = {
    wait_for: ".unit-expanded-card",
    extract_rules: {
      apartments: {
        selector: ".unit-expanded-card",
        type: "list",
        output: {
          info: {
            selector: ".ng-binding",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".pricing",
            type: "item"
          },
          picture: {
            selector: ".floorplan-img",
            output: "@data-src"
          }
        }
      }
    }
  };
  return params;
}

export function getParams399Fremont() {
  const params = {
    block_resources: "False",
    wait_for: ".ap-results",
    extract_rules: {
      apartments: {
        selector: ".ap-unit",
        type: "list",
        output: {
          beds: {
            selector: ".unit-bed-count"
          },
          baths: {
            selector: ".unit-bath-count"
          },
          area: {
            selector: ".unit-sqft"
          },
          picture: {
            selector: ".unit-image",
            output: "@data-src"
          },
          price: {
            selector: ".details-rent-amount"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsArcLight() {
  const params = {
    block_resources: "False",
    wait: "35000",
    wait_for: ".card",
    extract_rules: {
      apartments: {
        selector: '//input[@name="json_response"]',
        output: "@value"
      }
    }
  };
  return params;
}

export function getParamsSBMarina() {
  const params = {
    wait_for: ".fp-container",
    extract_rules: {
      apartments: {
        selector: '//div[@id="floorplans-container"]/div',
        type: "list",
        output: {
          info: {
            selector: "li",
            type: "list",
            output: "text"
          },
          price: {
            selector: ".card-body span",
            type: "item"
          },
          picture: {
            selector: ".card-img-top",
            output: "@src"
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsCentralApartments() {
  const params = {
    wait_for: ".all-listings",
    extract_rules: {
      apartments: {
        selector: ".listing-item",
        type: "list",
        output: {
          beds: {
            selector: ".beds"
          },
          baths: {
            selector: ".baths"
          },

          picture: {
            selector: ".list-img img",
            output: "@src"
          },
          price: {
            selector: ".rent-price"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsBaysideVillage() {
  const params = {
    block_resources: "False",
    wait: "3000",
    wait_for: ".floorplan-list",
    extract_rules: {
      apartments: {
        selector: ".floorplan-list > div",
        type: "list",
        output: {
          beds: {
            selector: ".card-item",
            output: "@data-beds"
          },
          area: {
            selector: ".card-item",
            output: "@data-maximumsqft"
          },
          link: {
            selector: ".card-item > div > div > div:nth-child(2) > button > a",
            output: "@href"
          },
          picture: {
            selector: ".image",
            output: "@src"
          },
          price: {
            selector: ".card-item",
            output: "@data-max_price"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsJasper() {
  const params = {
    wait_for: ".floorplan-details",
    extract_rules: {
      apartments: {
        selector: '//tr[@scope="row"]',
        type: "list",
        output: {
          bedsBaths: {
            selector: "td:nth-child(3)"
          },
          area: {
            selector: "td:nth-child(4)"
          },
          link: {
            selector: ".applyButton",
            output: "@onclick"
          },
          picture: {
            selector: ".floorplan-img > div > a > img",
            output: "@data-src"
          },
          price: {
            selector: "td:nth-child(5)"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsModera() {
  const params = {
    wait_for: ".fp-group-list",
    extract_rules: {
      apartments: {
        selector: ".fp-group-item",
        type: "list",
        output: {
          picture: {
            selector: ".image-link img",
            output: "@src"
          },
          info: {
            selector: ".bed-bath span",
            type: "list"
          },
          price: {
            selector: ".fee-transparency-text"
          },
          area: {
            selector: ".sq-feet"
          },
          link: {
            selector: ".secondary-action",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsRinconGreen() {
  const params = {
    wait: "3000",
    block_resources: "False",
    wait_for: ".rpfp-cards",
    extract_rules: {
      apartments: {
        selector: ".rpfp-card",
        type: "list",
        output: {
          picture: {
            selector: ".rpfp-image",
            output: "@data-src"
          },
          beds: {
            selector: ".rpfp-beds"
          },
          baths: {
            selector: ".rpfp-bath"
          },
          price: {
            selector: ".rpfp-rent"
          },
          area: {
            selector: ".rpfp-sqft"
          }
        }
      }
    }
  };
  return params;
}

export function getParams500Folsom() {
  const params = {
    wait_for: ".floor-plan-card__wrapper",
    extract_rules: {
      apartments: {
        selector: ".floor-plan-card__wrapper > div",
        type: "list",
        output: {
          info: {
            selector: ".floor-plan-card__content__size",
            output: "markdown_relevant"
          },
          picture: {
            selector: ".image-lightbox__image",
            output: "@src"
          },
          price: {
            selector: ".floor-plan-card__content__price"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsAvery450() {
  const params = {
    wait_for: ".views-content-inner",
    extract_rules: {
      apartments: {
        selector: '//*[@id="paragraph-6"]/div/div/div/div[3]/div[3]/div',
        type: "list",
        output: {
          bedsBaths: {
            selector: ".node--type-unit",
            output: "@data-variant"
          },
          price: {
            selector: ".node--type-unit",
            output: "@data-price"
          },
          picture: {
            selector: ".field--type-image img",
            output: "@src"
          },
          link: {
            selector: ".node--type-unit",
            output: "@about"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsParamount() {
  const params = {
    wait_for: ".views-content-inner",
    extract_rules: {
      apartments: {
        selector: '//*[@id="paragraph-6"]/div/div/div/div[3]/div[3]/div',
        type: "list",
        output: {
          bedsBaths: {
            selector: ".node--type-unit",
            output: "@data-variant"
          },
          price: {
            selector: ".node--type-unit",
            output: "@data-price"
          },
          picture: {
            selector: ".field--type-image img",
            output: "@src"
          },
          link: {
            selector: ".node--type-unit",
            output: "@about"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsSolaire() {
  const params = {
    render_js: true,
    js_scenario: {
      instructions: [
        {
          wait_for:
            "#jd-fp-body > div:nth-child(1) > div:nth-child(1) > div > div > div.jd-fp__toolbar-col.jd-fp__toolbar-col--tabs > div > a:nth-child(2)"
        },
        {
          wait_for_and_click:
            "#jd-fp-body > div:nth-child(1) > div:nth-child(1) > div > div > div.jd-fp__toolbar-col.jd-fp__toolbar-col--tabs > div > a:nth-child(2)"
        },
        { wait: 5000 },
        { wait_for: ".jd-fp-cards-container" }
      ]
    },
    wait: "5000",
    block_resources: "False",
    extract_rules: {
      apartments: {
        selector: ".jd-fp-floorplan-card",
        type: "list",
        output: {
          beds: {
            selector: ".jd-fp-card-info__text > span:nth-child(1)"
          },
          baths: {
            selector: ".jd-fp-card-info__text > span:nth-child(2)"
          },
          area: {
            selector: ".jd-fp-card-info__text > span:nth-child(3)"
          },
          price: {
            selector:
              ".jd-fp-floorplan-card__row--info > div > div > div > span"
          },
          picture: {
            selector: ".jd-fp-floorplan-card__image img",
            output: "@src"
          },
          link: {
            selector: ".jd-fp-floorplan-card--type-grid",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsTheTowersAtRincon() {
  const params = {
    block_resources: "False",
    wait_for: ".units_grid--content_container",
    extract_rules: {
      apartments: {
        selector: ".units_grid--item",
        type: "list",
        output: {
          bedsBaths: {
            selector: ".units_grid--item_info_list > span:nth-child(1)"
          },
          area: {
            selector: ".units_grid--item_info_list > span:nth-child(2)"
          },
          price: {
            selector: ".units_grid--item_info_list > span:nth-child(3)"
          },
          picture: {
            selector: ".units_grid--item_floorplan_inner img",
            output: "@src"
          },
          link: {
            selector: ".units_grid--item_footer_cta",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsSomaAt788() {
  const params = {
    render_js: true,
    js_scenario: {
      instructions: [
        {
          wait_for:
            "#jd-fp-body > div:nth-child(1) > div:nth-child(1) > div > div > div.jd-fp__toolbar-col.jd-fp__toolbar-col--tabs > div > a:nth-child(2)"
        },

        {
          wait_for_and_click:
            "#jd-fp-body > div:nth-child(1) > div:nth-child(1) > div > div > div.jd-fp__toolbar-col.jd-fp__toolbar-col--tabs > div > a:nth-child(2)"
        },
        { wait: 5000 },
        { wait_for: ".jd-fp-cards-container" }
      ]
    },
    wait: "5000",
    block_resources: "False",
    extract_rules: {
      apartments: {
        selector: ".jd-fp-floorplan-card",
        type: "list",
        output: {
          beds: {
            selector: "p.jd-fp-card-info__text > span:nth-child(1)"
          },
          baths: {
            selector: "p.jd-fp-card-info__text > span:nth-child(2)"
          },
          area: {
            selector: "p.jd-fp-card-info__text > span:nth-child(3)"
          },
          price: {
            selector:
              ".jd-fp-floorplan-card__row--info > div > div > div > span"
          },
          picture: {
            selector: ".jd-fp-floorplan-card__image img",
            output: "@src"
          },
          link: {
            selector: ".jd-fp-floorplan-card--type-grid",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}

export function getParamsRitchStreet() {
  const params = {
    wait_for: ".works-grid",
    block_resources: "False",
    extract_rules: {
      apartments: {
        selector: ".floorplan-item",
        type: "list",
        output: {
          area: {
            selector: ".floorplan-features > ul > li:nth-child(1) > b > span"
          },
          beds: {
            selector: ".floorplan-features > ul > li:nth-child(2) > b > span"
          },
          baths: {
            selector: ".floorplan-features > ul > li:nth-child(3) > b > span"
          },
          price: {
            selector: ".floorplan-num"
          },
          picture: {
            selector: ".floorplan-thumb a",
            output: "@href"
          },
          link: {
            selector: ".pr-button > a",
            output: "@href"
          }
        }
      }
    }
  };
  return params;
}
