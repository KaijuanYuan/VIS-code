(function(){var window=this;var d=this;var N=function(a){N[" "](a);return a};N[" "]=function(){};var g=function(){return d.googletag||(d.googletag={})};var f={1:"pagead2.googlesyndication.com",2:"pubads.g.doubleclick.net",3:"securepubads.g.doubleclick.net",7:.02,10:0,13:1500,16:.01,17:1,20:0,23:.001,24:200,27:.01,28:0,29:.01,33:"pagead2.googlesyndication.com",34:1,36:!1,37:.01,38:.001,46:!0,47:1E-4,53:"",54:0,57:.05,58:1,60:0,63:0,65:.01,66:1E-5,67:1,69:.99,70:.05,71:.05,73:.001,74:.05,75:"",76:"",77:.01,78:.01,88:.01,79:.95,86:.01,81:.001,82:10,83:1E-4,84:.001,85:.01,87:.2,89:.999,90:.01,91:.01,92:.01,93:.05,94:.01,95:.05,96:.999,97:.001,98:.01,
99:.01,100:.95,101:.001,102:.05,103:.01,104:"/pagead/js/rum.js",105:0,106:"1-0-8",107:"1-0-8",108:.05,109:.05,110:.01};f[6]=function(a,b){try{for(var c=null;c!=a;c=a,a=a.parent)switch(a.location.protocol){case "https:":return!0;case "file:":return!!b;case "http:":return!1}}catch(O){}return!0}(window);f[49]=(new Date).getTime();var q=function(){var a={},b;for(b in f)a[b]=f[b];this.a=a};q.prototype.get=function(a){return this.a[a]};q.prototype.set=function(a,b){this.a[a]=b};q.a=void 0;
q.getInstance=function(){return q.a?q.a:q.a=new q};var r=q.getInstance().a,t=g(),u=t._vars_,m;for(m in u)r[m]=u[m];t._vars_=r;var e=function(){return"114"},h=g();h.hasOwnProperty("getVersion")||(h.getVersion=e);N("partner.googleadservices.com");N("www.googletagservices.com");var w="",x="",k=q.getInstance().get(46)&&!q.getInstance().get(6),w=k?"http:":"https:",x=q.getInstance().get(k?2:3);var l=g(),n=(l.fifWin||window).document,p=[],v=g();v.hasOwnProperty("cmd")||(v.cmd=p);
if(l.evalScripts)l.evalScripts();else{var y=n.currentScript,z;var A=q.getInstance().get(76);A?z=A:(A=w+"//"+x+"/gpt/pubads_impl_114.js",q.getInstance().set(76,A),z=A);var B=window.navigator&&window.navigator.userAgent||"";-1!=B.indexOf("iPhone")&&q.getInstance().set(79,0);var C=-1!=B.indexOf("Firefox/52.0");(C||-1!=B.indexOf("Firefox/51.0"))&&q.getInstance().set(75,C?"21060228":"21060229");if(!("complete"==n.readyState||"loaded"==n.readyState||y&&y.async)){var D="gpt-impl-"+Math.random();try{n.write('<script id="'+
D+'" src="'+z+'">\x3c/script>'),l._syncTagged_=!0}catch(a){}n.getElementById(D)&&(l._loadStarted_=!0)}if(!l._loadStarted_){var E=n.createElement("script");E.src=z;E.async=!0;(n.head||n.body||n.documentElement).appendChild(E);l._loadStarted_=!0}};}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this)
