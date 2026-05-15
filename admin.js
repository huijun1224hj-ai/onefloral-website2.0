const statusEl=document.getElementById('status');
if(SHOP.supabaseUrl.includes('PASTE_')) statusEl.textContent='请先在 config.js 填 Supabase URL 和 anon key';
const sb=supabase.createClient(SHOP.supabaseUrl,SHOP.supabaseAnonKey);
document.getElementById('saveBtn').onclick=async()=>{
 const file=document.getElementById('photo').files[0]; if(!file){statusEl.textContent='请选择照片'; return;}
 statusEl.textContent='Uploading...';
 const filename=`${Date.now()}-${file.name.replaceAll(' ','-')}`;
 const up=await sb.storage.from('product-images').upload(filename,file,{upsert:false});
 if(up.error){statusEl.textContent='照片上传失败：'+up.error.message;return;}
 const publicUrl=sb.storage.from('product-images').getPublicUrl(filename).data.publicUrl;
 const row={title_cn:titleCN.value,title_en:titleEN.value,category:category.value,price:price.value,description:description.value,image_url:publicUrl,active:true};
 const ins=await sb.from('products').insert(row);
 if(ins.error){statusEl.textContent='保存失败：'+ins.error.message;return;}
 statusEl.textContent='成功上传，网站已更新'; loadList();
};
async function loadList(){const {data}=await sb.from('products').select('*').order('created_at',{ascending:false});adminList.innerHTML=(data||[]).map(p=>`<div class="adminItem"><img src="${p.image_url}"><span>${p.title_cn}<br>${p.price||''}</span></div>`).join('');}
if(!SHOP.supabaseUrl.includes('PASTE_')) loadList();
