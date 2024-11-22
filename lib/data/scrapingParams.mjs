// DOGPATCH

export function getParamsAvalon() {
  const params = {
    js_scenario: {
      instructions: [
        { wait_for_and_click: ".ant-modal-close" }, // use when there is popup modal on the webpage
        { wait_for_and_click: "[id^=load-all-units]" },
        { wait: 5000 },
      ],
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
            selector: ".description",
          },
          price: {
            selector: ".unit-price",
          },
          picture: {
            selector: ".unit-img",
            output: "@src",
          },
          link: {
            selector: ".unit-item-details-title",
            output: "@href",
          },
        },
      },
    },
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
            selector: ".bedbath",
          },
          area: {
            selector: ".sqft",
          },
          price: {
            selector: ".price",
          },
          picture: {
            selector: ".image-popup",
            output: "@href",
          },
          link: {
            selector: "a[title='Apply Now']",
            output: "@href",
          },
        },
      },
    },
  };
  return params;
}

export function getParamsTenn() {
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
            output: "text",
          },
          price: {
            selector: ".card-body span",
            type: "item",
          },
          picture: {
            selector: ".card-img-top",
            output: "@src",
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href",
          },
        },
      },
    },
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
        output: "@value",
      },
    },
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
            output: "text",
          },
          area: {
            selector: ".rpfp-sqft",
            type: "item",
            output: "text",
          },
          baths: {
            selector: ".rpfp-bath",
            type: "item",
            output: "text",
          },
          price: {
            selector: ".rpfp-rent",
            type: "item",
          },
          picture: {
            selector: ".rpfp-image",
            output: "@data-src",
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href",
          },
        },
      },
    },
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
            output: "text",
          },
          price: {
            selector: ".rent > div",
            type: "item",
            output: "text",
          },
          area: {
            selector: ".sq-feet > span",
            type: "list",
            output: "text",
          },
          picture: {
            selector: ".image-link img",
            output: "@src",
          },
          link: {
            selector: ".secondary-action",
            output: "@href",
          },
        },
      },
    },
  };
  return params;
}

export function getParamsOAM() {
  const params = {
    js_scenario: {
      instructions: [{ wait_for_and_click: ".card-nav-btn" }, { wait: 5000 }],
    },
    wait: "35000",
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
            output: "text",
          },
          price: {
            selector: ".rate-display span",
            type: "item",
          },
          picture: {
            selector: ".v-image__image",
            output: "@style",
          },
          link: {
            selector: ".card-cta a",
            output: "@href",
          },
        },
      },
    },
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
            type: "list",
          },
          baths: {
            selector: ".spaces__plan__attributes-bathcount span",
            type: "list",
          },
          area: {
            selector: ".spaces__plan__attributes-area span",
            type: "list",
          },
          price: {
            selector: ".spaces__label-price a",
            type: "item",
            output: "text",
          },
          picture: {
            selector: ".spaces__unit-media a",
            type: "list",
            output: "@href",
          },
          link: {
            selector: ".spaces__unit-cta a",
            output: "@href",
          },
        },
      },
    },
  };
  return params;
}

export function getParamsChase() {
  // needs to be added when complex has some apartments on web
  return {};
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
            type: "list",
          },
          baths: {
            selector: ".spaces__plan__attributes-bathcount span",
            type: "list",
          },
          area: {
            selector: ".spaces__plan__attributes-area span",
            type: "list",
          },
          price: {
            selector: ".spaces__label-price a",
            type: "item",
            output: "text",
          },
          picture: {
            selector: ".spaces__unit-media a",
            type: "list",
            output: "@href",
          },
          link: {
            selector: ".spaces__unit-cta a",
            output: "@href",
          },
        },
      },
    },
  };
  return params;
}

export function getParamsAvalonMissionBay() {
  const params = {
    js_scenario: {
      instructions: [
        { wait_for_and_click: ".ant-modal-close" }, // use when there is popup modal on the webpage
        { wait_for_and_click: "[id^=load-all-units]" },
        { wait: 5000 },
      ],
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
            selector: ".description",
          },
          price: {
            selector: ".unit-price",
          },
          picture: {
            selector: ".unit-img",
            output: "@src",
          },
          link: {
            selector: ".unit-item-details-title",
            output: "@href",
          },
        },
      },
    },
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
            output: "text",
          },
          price: {
            selector: ".card-body span",
            type: "item",
          },
          picture: {
            selector: ".card-img-top",
            output: "@src",
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href",
          },
        },
      },
    },
  };
  return params;
}

export function getParamsStrata() {
  const params = {
    js_scenario: {
      instructions: [
        { wait_for_and_click: ".close" }, // use when there is popup modal on the webpage
        { wait: 5000 },
      ],
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
            output: "text",
          },
          price: {
            selector: ".card-body span",
            type: "item",
          },
          picture: {
            selector: ".card-img-top",
            output: "@src",
          },
          link: {
            selector: ".floorplan-action-button",
            output: "@href",
          },
        },
      },
    },
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
            output: "text",
          },
          price: {
            selector: ".pricing",
            type: "item",
          },
          picture: {
            selector: ".floorplan-img",
            output: "@data-src",
          },
        },
      },
    },
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
        output: "@props",
      },
    },
  };
  return params;
}

export function getParamsCanyon() {
  const params = {
    js_scenario: {
      instructions: [
        {
          wait_for_and_click:
            "#page_component_0 > div > div.relative.z-50 > div > section > ul > li:nth-child(2) > button",
        },
        { wait: 300 },
      ],
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
            output: "@src",
          },
          info: {
            selector: ".body-wrapper li",
            type: "list",
          },
          link: {
            selector: ".body-wrapper a",
            output: "@href",
          },
        },
      },
    },
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
            selector: ".unit-bed-count",
          },
          baths: {
            selector: ".unit-bath-count",
          },
          area: {
            selector: ".unit-sqft",
          },
          picture: {
            selector: ".unit-image",
            output: "@data-src",
          },
          price: {
            selector: ".details-rent-amount",
          },
        },
      },
    },
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
            selector: ".unit-bed-count",
          },
          baths: {
            selector: ".unit-bath-count",
          },
          area: {
            selector: ".unit-sqft",
          },
          picture: {
            selector: ".unit-image",
            output: "@data-src",
          },
          price: {
            selector: ".details-rent-amount",
          },
        },
      },
    },
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
            output: "markdown_relevant",
          },
          picture: {
            selector: ".image-lightbox__image",
            output: "@src",
          },
          price: {
            selector: ".floor-plan-card__content__price",
          },
        },
      },
    },
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
            output: "@src",
          },
          info: {
            selector: ".bed-bath span",
            type: "list",
          },
          price: {
            selector: ".fee-transparency-text",
          },
          area: {
            selector: ".sq-feet",
          },
          link: {
            selector: ".secondary-action",
            output: "@href",
          },
        },
      },
    },
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
            output: "text",
          },
          price: {
            selector: ".pricing",
            type: "item",
          },
          picture: {
            selector: ".floorplan-img",
            output: "@data-src",
          },
        },
      },
    },
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
            output: "text",
          },
          price: {
            selector: ".pricing",
            type: "item",
          },
          picture: {
            selector: ".floorplan-img",
            output: "@data-src",
          },
        },
      },
    },
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
            selector: ".unit-bed-count",
          },
          baths: {
            selector: ".unit-bath-count",
          },
          area: {
            selector: ".unit-sqft",
          },
          picture: {
            selector: ".unit-image",
            output: "@data-src",
          },
          price: {
            selector: ".details-rent-amount",
          },
        },
      },
    },
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
        output: "@value",
      },
    },
  };
  return params;
}
