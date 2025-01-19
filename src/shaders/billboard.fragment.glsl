precision mediump float;

varying vec3 vColor;// Цвет экземпляра

void main(){
    gl_FragColor=vec4(vColor,1.);// Используем переданный цвет
}