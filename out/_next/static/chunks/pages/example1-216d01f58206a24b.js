(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[805],{2381:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/example1",function(){return s(1278)}])},1278:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return M}});var i=s(5893),n=s(5988),o=s(7294),r=s(2212);const a=/^[og]\s*(.+)?/,c=/^mtllib /,h=/^usemtl /,l=/^usemap /,u=new r.Pa4,d=new r.Pa4,p=new r.Pa4,m=new r.Pa4,f=new r.Pa4;function w(){const e={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&!1===this.object.fromDeclaration)return this.object.name=e,void(this.object.fromDeclaration=!1!==t);const s=this.object&&"function"===typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"===typeof this.object._finalize&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:!1!==t,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(e,t){const s=this._finalize(!1);s&&(s.inherited||s.groupCount<=0)&&this.materials.splice(s.index,1);const i={index:this.materials.length,name:e||"",mtllib:Array.isArray(t)&&t.length>0?t[t.length-1]:"",smooth:void 0!==s?s.smooth:this.smooth,groupStart:void 0!==s?s.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(e){const t={index:"number"===typeof e?e:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return t.clone=this.clone.bind(t),t}};return this.materials.push(i),i},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(e){const t=this.currentMaterial();if(t&&-1===t.groupEnd&&(t.groupEnd=this.geometry.vertices.length/3,t.groupCount=t.groupEnd-t.groupStart,t.inherited=!1),e&&this.materials.length>1)for(let s=this.materials.length-1;s>=0;s--)this.materials[s].groupCount<=0&&this.materials.splice(s,1);return e&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),t}},s&&s.name&&"function"===typeof s.clone){const e=s.clone(0);e.inherited=!0,this.object.materials.push(e)}this.objects.push(this.object)},finalize:function(){this.object&&"function"===typeof this.object._finalize&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const s=parseInt(e,10);return 3*(s>=0?s-1:s+t/3)},parseNormalIndex:function(e,t){const s=parseInt(e,10);return 3*(s>=0?s-1:s+t/3)},parseUVIndex:function(e,t){const s=parseInt(e,10);return 2*(s>=0?s-1:s+t/2)},addVertex:function(e,t,s){const i=this.vertices,n=this.object.geometry.vertices;n.push(i[e+0],i[e+1],i[e+2]),n.push(i[t+0],i[t+1],i[t+2]),n.push(i[s+0],i[s+1],i[s+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,s){const i=this.normals,n=this.object.geometry.normals;n.push(i[e+0],i[e+1],i[e+2]),n.push(i[t+0],i[t+1],i[t+2]),n.push(i[s+0],i[s+1],i[s+2])},addFaceNormal:function(e,t,s){const i=this.vertices,n=this.object.geometry.normals;u.fromArray(i,e),d.fromArray(i,t),p.fromArray(i,s),f.subVectors(p,d),m.subVectors(u,d),f.cross(m),f.normalize(),n.push(f.x,f.y,f.z),n.push(f.x,f.y,f.z),n.push(f.x,f.y,f.z)},addColor:function(e,t,s){const i=this.colors,n=this.object.geometry.colors;void 0!==i[e]&&n.push(i[e+0],i[e+1],i[e+2]),void 0!==i[t]&&n.push(i[t+0],i[t+1],i[t+2]),void 0!==i[s]&&n.push(i[s+0],i[s+1],i[s+2])},addUV:function(e,t,s){const i=this.uvs,n=this.object.geometry.uvs;n.push(i[e+0],i[e+1]),n.push(i[t+0],i[t+1]),n.push(i[s+0],i[s+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,s,i,n,o,r,a,c){const h=this.vertices.length;let l=this.parseVertexIndex(e,h),u=this.parseVertexIndex(t,h),d=this.parseVertexIndex(s,h);if(this.addVertex(l,u,d),this.addColor(l,u,d),void 0!==r&&""!==r){const e=this.normals.length;l=this.parseNormalIndex(r,e),u=this.parseNormalIndex(a,e),d=this.parseNormalIndex(c,e),this.addNormal(l,u,d)}else this.addFaceNormal(l,u,d);if(void 0!==i&&""!==i){const e=this.uvs.length;l=this.parseUVIndex(i,e),u=this.parseUVIndex(n,e),d=this.parseUVIndex(o,e),this.addUV(l,u,d),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let s=0,i=e.length;s<i;s++){const i=this.parseVertexIndex(e[s],t);this.addVertexPoint(i),this.addColor(i)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const s=this.vertices.length,i=this.uvs.length;for(let n=0,o=e.length;n<o;n++)this.addVertexLine(this.parseVertexIndex(e[n],s));for(let n=0,o=t.length;n<o;n++)this.addUVLine(this.parseUVIndex(t[n],i))}};return e.startObject("",!1),e}class g extends r.aNw{constructor(e){super(e),this.materials=null}load(e,t,s,i){const n=this,o=new r.hH6(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,(function(s){try{t(n.parse(s))}catch(o){i?i(o):console.error(o),n.manager.itemError(e)}}),s,i)}setMaterials(e){return this.materials=e,this}parse(e){const t=new w;-1!==e.indexOf("\r\n")&&(e=e.replace(/\r\n/g,"\n")),-1!==e.indexOf("\\\n")&&(e=e.replace(/\\\n/g,""));const s=e.split("\n");let i="",n="",o=0,u=[];const d="function"===typeof"".trimLeft;for(let r=0,m=s.length;r<m;r++)if(i=s[r],i=d?i.trimLeft():i.trim(),o=i.length,0!==o&&(n=i.charAt(0),"#"!==n))if("v"===n){const e=i.split(/\s+/);switch(e[0]){case"v":t.vertices.push(parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3])),e.length>=7?t.colors.push(parseFloat(e[4]),parseFloat(e[5]),parseFloat(e[6])):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3]));break;case"vt":t.uvs.push(parseFloat(e[1]),parseFloat(e[2]))}}else if("f"===n){const e=i.substr(1).trim().split(/\s+/),s=[];for(let t=0,i=e.length;t<i;t++){const i=e[t];if(i.length>0){const e=i.split("/");s.push(e)}}const n=s[0];for(let i=1,o=s.length-1;i<o;i++){const e=s[i],o=s[i+1];t.addFace(n[0],e[0],o[0],n[1],e[1],o[1],n[2],e[2],o[2])}}else if("l"===n){const e=i.substring(1).trim().split(" ");let s=[];const n=[];if(-1===i.indexOf("/"))s=e;else for(let t=0,i=e.length;t<i;t++){const i=e[t].split("/");""!==i[0]&&s.push(i[0]),""!==i[1]&&n.push(i[1])}t.addLineGeometry(s,n)}else if("p"===n){const e=i.substr(1).trim().split(" ");t.addPointGeometry(e)}else if(null!==(u=a.exec(i))){const e=(" "+u[0].substr(1).trim()).substr(1);t.startObject(e)}else if(h.test(i))t.object.startMaterial(i.substring(7).trim(),t.materialLibraries);else if(c.test(i))t.materialLibraries.push(i.substring(7).trim());else if(l.test(i))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if("s"===n){if(u=i.split(" "),u.length>1){const e=u[1].trim().toLowerCase();t.object.smooth="0"!==e&&"off"!==e}else t.object.smooth=!0;const e=t.object.currentMaterial();e&&(e.smooth=t.object.smooth)}else{if("\0"===i)continue;console.warn('THREE.OBJLoader: Unexpected line: "'+i+'"')}t.finalize();const p=new r.ZAu;p.materialLibraries=[].concat(t.materialLibraries);if(!0===!(1===t.objects.length&&0===t.objects[0].geometry.vertices.length))for(let a=0,c=t.objects.length;a<c;a++){const e=t.objects[a],s=e.geometry,i=e.materials,n="Line"===s.type,o="Points"===s.type;let c=!1;if(0===s.vertices.length)continue;const h=new r.u9r;h.setAttribute("position",new r.a$l(s.vertices,3)),s.normals.length>0&&h.setAttribute("normal",new r.a$l(s.normals,3)),s.colors.length>0&&(c=!0,h.setAttribute("color",new r.a$l(s.colors,3))),!0===s.hasUVIndices&&h.setAttribute("uv",new r.a$l(s.uvs,2));const l=[];for(let a=0,d=i.length;a<d;a++){const e=i[a],s=e.name+"_"+e.smooth+"_"+c;let h=t.materials[s];if(null!==this.materials)if(h=this.materials.create(e.name),!n||!h||h instanceof r.nls){if(o&&h&&!(h instanceof r.UY4)){const e=new r.UY4({size:10,sizeAttenuation:!1});r.F5T.prototype.copy.call(e,h),e.color.copy(h.color),e.map=h.map,h=e}}else{const e=new r.nls;r.F5T.prototype.copy.call(e,h),e.color.copy(h.color),h=e}void 0===h&&(h=n?new r.nls:o?new r.UY4({size:1,sizeAttenuation:!1}):new r.xoR,h.name=e.name,h.flatShading=!e.smooth,h.vertexColors=c,t.materials[s]=h),l.push(h)}let u;if(l.length>1){for(let e=0,t=i.length;e<t;e++){const t=i[e];h.addGroup(t.groupStart,t.groupCount,e)}u=n?new r.ejS(h,l):o?new r.woe(h,l):new r.Kj0(h,l)}else u=n?new r.ejS(h,l[0]):o?new r.woe(h,l[0]):new r.Kj0(h,l[0]);u.name=e.name,p.add(u)}else if(t.vertices.length>0){const e=new r.UY4({size:1,sizeAttenuation:!1}),s=new r.u9r;s.setAttribute("position",new r.a$l(t.vertices,3)),t.colors.length>0&&void 0!==t.colors[0]&&(s.setAttribute("color",new r.a$l(t.colors,3)),e.vertexColors=!0);const i=new r.woe(s,e);p.add(i)}return p}}var b=s(2967),v=s(9365);const j=[];for(let I=0;I<256;I++)j[I]=(I<16?"0":"")+I.toString(16);const y=Math.PI/180;Math.PI;function x(e,t){return e+Math.random()*(t-e)}function z(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var _=function(){function e(t){var s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.windowResize=function(){s.widowsize.width=window.innerWidth,s.widowsize.height=window.innerHeight,s.camera.aspect=s.widowsize.width/s.widowsize.height,s.camera.updateProjectionMatrix(),s.render.setSize(s.widowsize.width,s.widowsize.height)},this.UpdateRender=function(){requestAnimationFrame(s.UpdateRender),s.controls.update(),s.render.render(s.scene,s.camera)},this.canvas=t,this.widowsize={width:window.innerWidth,height:window.innerHeight},this.init(),this.UpdateRender(),window.addEventListener("resize",this.windowResize)}var t,s,i;return t=e,(s=[{key:"init",value:function(){var e=this;this.render=new r.CP7({canvas:this.canvas}),this.render.setSize(this.widowsize.width,this.widowsize.height),this.render.shadowMap.enabled=!0,this.scene=new r.xsS,this.camera=new r.cPb(50,this.widowsize.width/this.widowsize.height,.1,1e8),this.camera.position.set(0,4,5),this.camera.lookAt(0,0,0),this.controls=new v.z(this.camera,this.render.domElement),this.controls.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.controls.update();var t=new r.dpR,s=(t.load("ash_uvgrid01.jpg"),t.load("T_Floor_Col.jpg")),i=t.load("T_Floor_N.jpg"),n=t.load("T_Floor_Roughness.jpg"),o=t.load("MagicMushroom/T_Mushroom_Col_4.png"),a=t.load("MagicMushroom/T_Mushroom_Emissive.png"),c=new r.EJi({map:o,emissiveMap:a,emissiveIntensity:1});new g,(new b.y).load("MagicMushroom/SM_Magic_Mushroom01.fbx",(function(t){t.position.set(-1,0,0),t.rotateX(-Math.PI/2),t.scale.set(1e-4,1e-4,1e-4),t.castShadow=!0,t.traverse((function(e){var t,s;t=e,(null!=(s=r.Kj0)&&"undefined"!==typeof Symbol&&s[Symbol.hasInstance]?s[Symbol.hasInstance](t):t instanceof s)&&(e.material=c)}));for(var s=0;s<10;s++){var i=t.clone();i.position.set(x(-4,4),0,x(-4,4)),i.rotateZ(x(0,360)*y),i.castShadow=!0,i.receiveShadow=!0,e.scene.add(i)}}));var h=new r.Kj0(new r._12(10,10),new r.EJi({map:s,normalMap:i,roughnessMap:n,specularIntensity:1,metalness:1}));h.receiveShadow=!0,h.rotation.x=-Math.PI/2,this.scene.add(h);var l=new r.cek(16777215,1,100);l.castShadow=!0,l.position.set(3,3,3),this.scene.add(l)}}])&&z(t.prototype,s),i&&z(t,i),e}(),M=function(){var e=(0,o.useRef)(null);return(0,o.useEffect)((function(){document.title="example1",new _(e.current)}),[]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.default,{id:"3b2d5414814eb582",children:"* {margin:0;\npadding:0;\nbox-sizing:border-box}\ncanvas {display:block}"}),(0,i.jsx)("canvas",{ref:e,className:"jsx-3b2d5414814eb582"})]})}}},function(e){e.O(0,[774,737,840,967,888,179],(function(){return t=2381,e(e.s=t);var t}));var t=e.O();_N_E=t}]);