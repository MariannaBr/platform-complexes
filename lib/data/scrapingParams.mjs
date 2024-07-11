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
    wait_for: ".fp-container",
    extract_rules: {
      apartments: {
        selector: '//div[@id="floorplans-container"]/div',
        type: "list",
        output: {
          title: {
            selector: "h2",
            type: "item",
          },
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

export function getParamsChase() {
  // needs to be added when complex has some apartments on web
  return {};
}
