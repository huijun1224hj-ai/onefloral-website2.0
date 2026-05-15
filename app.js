const fallbackProducts = [
 {titleCN:'批发花束',titleEN:'Wholesale Bouquets',category:'批发花束',price:'欢迎询价',image:'assets/wholesale-bouquets.jpeg',description:'适合活动、企业订单、批量供应'},
 {titleCN:'手捧花',titleEN:'Hand Bouquet',category:'手捧花 / 胸针',price:'欢迎询价',image:'assets/hand-bouquet.jpeg',description:'婚礼、注册、拍照适用'},
 {titleCN:'毕业花束',titleEN:'Graduation Bouquet',category:'定制花束',price:'欢迎询价',image:'assets/graduation-bouquet.jpeg',description:'毕业礼物与拍照花束'},
 {titleCN:'毕业胸针',titleEN:'Graduation Corsage',category:'手捧花 / 胸针',price:'欢迎询价',image:'assets/graduation-corsage.jpeg',description:'毕业永生花胸针'},
 {titleCN:'开业花盒',titleEN:'Opening Flower Box',category:'开业花',price:'欢迎询价',image:'assets/opening-flower-box.jpeg',description:'开业、乔迁、生意兴隆'},
 {titleCN:'送礼花束',titleEN:'Gift Bouquet',category:'定制花束',price:'欢迎询价',image:'assets/gift-bouquet.jpeg',description:'生日、纪念日、送礼'},
 {titleCN:'香皂花花盒',titleEN:'Soap Flower Box',category:'香皂花花盒',price:'欢迎询价',image:'assets/soap-flower-box.jpeg',description:'香皂花，寓意永恒心意'}
];
const waText = encodeURIComponent('Hi One Floral, 我想询问花束 / I would like to enquire about flowers.');
document.getElementById('mainWhatsapp').href = `https://wa.me/${SHOP.whatsapp}?text=${waText}`;
document.getElementById('contactWhatsapp').href = `https://wa.me/${SHOP.whatsapp}?text=${waText}`;
let allProducts=[];
async function loadProducts(){
 if(!SHOP.supabaseUrl.includes('PASTE_')){
  const sb = supabase.createClient(SHOP.supabaseUrl, SHOP.supabaseAnonKey);
  const {data,error}=await sb.from('products').select('*').eq('active',true).order('created_at',{ascending:false});
  allProducts = (!error && data && data.length) ? data.map(x=>({titleCN:x.title_cn,titleEN:x.title_en,category:x.category,price:x.price,image:x.image_url,description:x.description})) : fallbackProducts;
 } else { allProducts=fallbackProducts; }
 renderFilters(); renderProducts(allProducts);
}
function renderFilters(){const cats=['全部 All',...new Set(allProducts.map(p=>p.category))];document.getElementById('filters').innerHTML=cats.map(c=>`<button onclick="filterProducts('${c}')">${c}</button>`).join('');}
function filterProducts(c){renderProducts(c==='全部 All'?allProducts:allProducts.filter(p=>p.category===c));}
function renderProducts(products){document.getElementById('productGrid').innerHTML=products.map(p=>{const msg=encodeURIComponent(`Hi One Floral, 我想询问这个作品：${p.titleCN} ${p.price||''}`);return `<article class="card"><img src="${p.image}" alt="${p.titleEN}"><div><h3>${p.titleCN}</h3><p>${p.titleEN}</p><b>${p.price||'欢迎询价'}</b><p>${p.description||p.category}</p><a target="_blank" href="https://wa.me/${SHOP.whatsapp}?text=${msg}">WhatsApp 下单</a></div></article>`}).join('');}
loadProducts();
