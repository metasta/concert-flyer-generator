function initThemes(){
 var fragment = document.createDocumentFragment();
 var theme = THEMECSS.split("\n").filter(s => s.match(/^\./)).slice(1).map(s => s.replace(/\.(.*)\s.*$/,"$1"));
 for(var i = 0; i < theme.length; i++){
  if(! theme[i]){ continue; }
  var ipt = document.createElement('input');
  ipt.setAttribute('type','radio');
  ipt.setAttribute('name','theme');
  ipt.setAttribute('id','theme_' + theme[i]);
  ipt.value = theme[i];
  ipt.addEventListener('input',updatePreview);
  if(i == 0){ ipt.checked = true; }

  var lbl = document.createElement('label');
  lbl.setAttribute('for','theme_' + theme[i]);
  lbl.className = theme[i];
  lbl.innerText = theme[i];

  fragment.appendChild(ipt);
  fragment.appendChild(lbl);
 }
 var div = document.getElementById('themes');
 div.appendChild(fragment);
}

function URI2Editor(){
 var a = location.hash.replace(/^#/,'').split(',')
          .map(s => s.split(':',2))
          .reduce((l,[k,v]) => Object.assign(l, {[k]:decodeURIComponent(v)}), {});
 if (!a) { return };
 if ("program_count" in a && a["program_count"] > 0 && a["program_count"] < 10 ){
  var diff = a["program_count"] - 3;
  while (diff > 0){ incrementProg(false); diff--; }
  while (diff < 0){ decrementProg(false); diff++; }
  delete a["program_count"];
 }
 if ("theme" in a){
  document.forms[0].theme.value = a["theme"];
  delete a["theme"];
 }
 if ("support" in a){
  document.getElementById('support').value = a["support"].replace(/<br>/g, "\n");
  delete a["support"];
 }
 for (key in a) {
  if (document.getElementById(key)){ document.getElementById(key).value = a[key]; }
 }
}

var updatePreview = (function (){
 var default_parameters = {
  theme: "forest",
  title: "広島大学霞管弦楽団",
  title2: "Spring Concert 2020",
  program_count: "3",
  main_composer: "ブラームス",
  main_composer_en: "Johannes Brahms",
  main: "交響曲第4番",
  main_en: "Symphony No.4 in E minor",
  sub1_composer: "チャイコフスキー",
  sub1_composer_en: "Pyotr Tchaikovsky",
  sub1: "<small>バレエ組曲</small>《くるみ割り人形》<small>より</small>",
  sub1_en: "The Nutcracker",
  sub2_composer: "ドヴォルザーク",
  sub2_composer_en: "Antonín Dvořák",
  sub2: "<small>序曲</small>《謝肉祭》",
  sub2_en: "Carnival, Op.92",
  conductor_photo: "齊城英樹.jpg",
  conductor: "齊城英樹",
  fulldate: "2020-04-11",
  time_open: "14:00",
  time_start: "14:30",
  place: "南区民文化センター ホール",
  organizer: "広島大学霞管弦楽団",
  support: "一般社団法人広島市医師会・一般社団法人広島県医師会・一般社団法人広島市薬剤師会<br>公益社団法人広島県薬剤師会・一般社団法人広島市歯科医師会・一般社団法人広島県歯科医師会<br>広島市教育委員会・中国新聞社・ヤマハミュージック　広島店",
  tel: "012-3456-7890",
  representative: "○○",
  email: "kasumi.orchestra@gmail.com"
 };

 return function(e){
  var val = {};
  val["theme"]            = document.forms[0].theme.value;
  val["title"]            = document.getElementById('title' ).value;
  val["title2"]           = document.getElementById('title2').value;
  val["program_count"]    = document.getElementById('input_program').children.length;
  val["main_composer"]    = document.getElementById('main_composer').value;
  val["main_composer_en"] = document.getElementById('main_composer_en').value;
  val["main"]             = document.getElementById('main').value;
  val["main_en"]          = document.getElementById('main_en').value;
  for(var i = 1; i < val["program_count"]; i++){
   val["sub" + i + "_composer"]    = document.getElementById('sub' + i + '_composer').value;
   val["sub" + i + "_composer_en"] = document.getElementById('sub' + i + '_composer_en').value;
   val["sub" + i ]                 = document.getElementById('sub' + i ).value;
   val["sub" + i + "_en"]          = document.getElementById('sub' + i + '_en').value;
  }
  val["conductor_photo"] = document.getElementById('conductor_photo').value;
  val["conductor"]       = document.getElementById('conductor').value;
  val["fulldate"]        = document.getElementById('fulldate').value;
  val["time_open"]       = document.getElementById('time_open').value;
  val["time_start"]      = document.getElementById('time_start').value;
  val["place"]           = document.getElementById('place').value;
  val["organizer"]       = document.getElementById('organizer').value;
  val["tel"]             = document.getElementById('tel').value;
  val["email"]           = document.getElementById('email').value;
  val["representative"]  = document.getElementById('representative').value;
  val["support"]         = document.getElementById('support').value
                            .replace(/\r\n/g,'<br>')
                            .replace(/(\r|\n)/g,'<br>')
                            .replace(/^(<br>)*/,'')
                            .replace(/(<br>)*$/,'');
  

  document.getElementById('a4area').className    = val["theme"];
  document.getElementById('p__title').innerHTML  = val["title"];
  document.getElementById('p__title2').innerHTML = val["title2"];
  document.getElementById('p__main_composer').innerHTML    = val["main_composer"];
  document.getElementById('p__main_composer_en').innerHTML = val["main_composer_en"];
  document.getElementById('p__main').innerHTML             = val["main"];
  document.getElementById('p__main_en').innerHTML          = val["main_en"];
  for (var i = 1; i < val["program_count"]; i++){
   document.getElementById('p__sub' + i + '_composer').innerHTML    = val["sub" + i + "_composer"];
   document.getElementById('p__sub' + i + '_composer_en').innerHTML = val["sub" + i + "_composer_en"];
   document.getElementById('p__sub' + i ).innerHTML                 = val["sub" + i ];
   document.getElementById('p__sub' + i + '_en').innerHTML          = val["sub" + i + "_en"];
  }
  document.getElementById('p__conductor_photo').style.backgroundImage = 'url(' + val["conductor_photo"] + ')';
  document.getElementById('p__conductor').innerHTML = val["conductor"];
  var date = new Date(val["fulldate"]);
  document.getElementById('p__year').innerHTML           = (date.getFullYear() || "");
  document.getElementById('p__month').innerHTML          = (date.getMonth() + 1 || "");
  document.getElementById('p__day').innerHTML            = (date.getDate() || "");
  document.getElementById('p__youbi').innerHTML          = ['SUN','MON','TUE','WED','THU','FRI','SAT'][(date.getDay()||0)];
  document.getElementById('p__time_open').innerHTML      = val["time_open"];
  document.getElementById('p__time_start').innerHTML     = val["time_start"];
  document.getElementById('p__place').innerHTML          = val["place"];
  document.getElementById('p__organizer').innerHTML      = val["organizer"];
  document.getElementById('p__tel').innerHTML            = val["tel"];
  document.getElementById('p__email').innerHTML          = val["email"];
  document.getElementById('p__representative').innerHTML = val["representative"];
  document.getElementById('p__support').innerHTML        = val["support"];

  document.title = val["title2"] + " チラシ";

  var hash_str = Object.entries(val)
                  .filter(item => (default_parameters[item[0]] != item[1]))
                  .map(([k,v]) => k + ':' + encodeURIComponent(v)).join(",");
  location.hash = (hash_str != "") ? hash_str : "_";
  document.getElementById('save_url').value = location.href;
 };
})();



function incrementProg(e){
 var ul = document.getElementById('input_program');
 if (ul) {
  var new_index = ul.children.length;

  var newformitem = document.createElement('li');
  newformitem.classList.add('hidden');
  newformitem.innerHTML = ''
   + '<h3>サブ' + new_index + '</h3>'
   + '<label for="sub' + new_index + '_composer">作曲者</label>'
   + '<input type="text" id="sub' + new_index + '_composer" value="ボロディン">'
   + '<label for="sub' + new_index + '_composer_en">作曲者（欧字表記）</label>'
   + '<input type="text" id="sub' + new_index + '_composer_en" value="Aleksandr Borodin">'
   + '<label for="sub' + new_index + '">曲名</label>'
   + '<input type="text" id="sub' + new_index + '" value="<small>歌劇『イーゴリ公』より</small><ruby>韃靼<rt>だったん</ruby>人の踊り">'
   + '<label for="sub' + new_index + '_en">曲名（欧字表記）</label>'
   + '<input type="text" id="sub' + new_index + '_en" value="Polovtsian Dances from “Prince Igor”">';
  ul.appendChild(newformitem);

  var newinput = newformitem.getElementsByTagName('input');
  for (var i = 0; i < newinput.length; i++){
   newinput[i].addEventListener('input',updatePreview);
  }

  if (e){ /* ボタンクリックによる挙動（form の transition 有効） */
   setTimeout(function(){
    newformitem.classList.remove('hidden');
   }, 100);
  } else { /* 直接呼び出した際の挙動（form の transition 無効）*/
   newformitem.classList.remove('hidden');
  }
  document.getElementById('decrement_button').disabled = false;

  var newpreviewitem = document.createElement('li');
  newpreviewitem.innerHTML = ''
   + '<span id="p__sub' + new_index + '_composer"></span> <br>'
   + '<cite><span id="p__sub' + new_index + '"></span></cite>'
   + '<i><span id="p__sub' + new_index + '_composer_en"></span>: '
   + '<cite><span id="p__sub' + new_index + '_en"></span></cite></i>';
  document.getElementById('program').appendChild(newpreviewitem);

  updatePreview();
 }
}

function decrementProg(e){
 var ul = document.getElementById('input_program');
 if (ul && ul.children.length > 1) {
  ul.lastElementChild.classList.toggle('hidden');
  var removeElem = function(){
    ul.removeChild(ul.lastElementChild);
    if(ul.children.length == 1){
     document.getElementById('decrement_button').disabled = true;
    }
    document.getElementById('program').removeChild(document.getElementById('program').lastElementChild);
    updatePreview();
  }
  if (e){ /* ボタンクリックによる挙動（transition が終わってから要素を削除）*/
   setTimeout(removeElem, 300);
  } else { /* 直接呼び出した際の挙動（transition を待たず要素を削除） */
   removeElem();
  }
 }
}

document.getElementById('save_toggle').addEventListener('change', function(){
 if (this.checked){
  document.getElementById('save_url').focus();
 } else {
  document.getElementById('save_url').blur();
 }
});
document.getElementById('save_url').addEventListener('focus',function(){
 this.select();
});
document.getElementById('save_url').addEventListener('click',function(){
 this.select();
});
document.getElementById('save_url').addEventListener('blur',function(){
 document.getElementById('save_toggle').checked = false;
});

document.getElementById('printer_button'  ).addEventListener('click',function(e){window.print()});
document.getElementById('increment_button').addEventListener('click',incrementProg);
document.getElementById('decrement_button').addEventListener('click',decrementProg);

var input = document.getElementsByTagName('input');
for (var i = 0; i < input.length; i++){
 input[i].addEventListener('input',updatePreview);
}
var textarea = document.getElementsByTagName('textarea');
for (var i = 0; i < textarea.length; i++){
 textarea[i].addEventListener('input',updatePreview);
}

window.addEventListener('load',function(e){
 initThemes();
 URI2Editor();
 updatePreview();
});