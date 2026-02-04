(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&u(a)}).observe(document,{childList:!0,subtree:!0});function h(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(r){if(r.ep)return;r.ep=!0;const t=h(r);fetch(r.href,t)}})();const g=`#ifdef GL_ES\r
precision mediump float;\r
#endif\r
\r
uniform vec2 u_resolution;\r
uniform float u_time;\r
\r
void main() {\r
  vec2 st = gl_FragCoord.xy / u_resolution.xy;\r
  vec3 color = vec3(st.x, st.y, abs(sin(u_time)));\r
  gl_FragColor = vec4(color, 1.0);\r
}\r
`,i=document.getElementById("c"),e=i.getContext("webgl");if(!e)throw document.body.innerHTML='<pre style="color:white">WebGL not supported</pre>',new Error("WebGL not supported");function f(){i.width=window.innerWidth,i.height=window.innerHeight,e.viewport(0,0,i.width,i.height)}window.addEventListener("resize",f);f();const p=`
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`,d=e.createShader(e.VERTEX_SHADER);e.shaderSource(d,p);e.compileShader(d);const c=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(c,g);e.compileShader(c);if(!e.getShaderParameter(c,e.COMPILE_STATUS)){const o=e.getShaderInfoLog(c);throw document.body.innerHTML=`<pre style="color:white">Shader error:
`+o+"</pre>",new Error(o)}const n=e.createProgram();e.attachShader(n,d);e.attachShader(n,c);e.linkProgram(n);if(!e.getProgramParameter(n,e.LINK_STATUS)){const o=e.getProgramInfoLog(n);throw document.body.innerHTML=`<pre style="color:white">Program error:
`+o+"</pre>",new Error(o)}e.useProgram(n);const S=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,S);e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const l=e.getAttribLocation(n,"position");e.enableVertexAttribArray(l);e.vertexAttribPointer(l,2,e.FLOAT,!1,0,0);const L=e.getUniformLocation(n,"u_resolution"),w=e.getUniformLocation(n,"u_time");function m(o){o*=.001,e.uniform2f(L,i.width,i.height),e.uniform1f(w,o),e.drawArrays(e.TRIANGLE_STRIP,0,4),requestAnimationFrame(m)}requestAnimationFrame(m);
