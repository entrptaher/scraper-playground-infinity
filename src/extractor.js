const delay = d => new Promise(r => setTimeout(r, d));

const scrollAndExtract = async (selector, leaf, remove) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView();
    const data = element[leaf];
    if (remove) element.remove();
    return data;
  }
};

async function extractor() {
  const title = await scrollAndExtract(".identifier", "innerText", true);
  const img = await scrollAndExtract('.md5', "innerText", true);
  return { title, img };
}

const products = [];
async function hundredProducts() {
  if (products.length < 100) {
    await delay(500);
    window.scrollTo(0, 0);
    
    console.log('Scrolling')
    const data = await extractor();
    console.log(data)
    if (!data.title || !data.img) return null;

    products.push(data);
    return hundredProducts();
  }
}

hundredProducts().then(() => console.log(products))