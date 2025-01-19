attribute vec3 position;// Позиции вершин плоскости
attribute vec4 instanceMatrix;// Матрица трансформации экземпляра
attribute vec3 instanceColor;// Цвет экземпляра

uniform mat4 modelViewMatrix;// Матрица вида
uniform mat4 projectionMatrix;// Проекционная матрица
uniform vec3 cameraPosition;// Позиция камеры

varying vec3 vColor;// Передаем цвет во фрагментный шейдер

void main(){
    // Позиция центра экземпляра
    vec3 instancePosition=(instanceMatrix*vec4(0.,0.,0.,1.)).xyz;
    
    // Вектор от центра экземпляра к камере
    vec3 lookDir=normalize(cameraPosition-instancePosition);
    
    // Вектор "вверх"
    vec3 up=vec3(0.,1.,0.);
    
    // Вычисляем вектор "вправо"
    vec3 right=normalize(cross(up,lookDir));
    
    // Перпендикулярный "вверх"
    up=cross(lookDir,right);
    
    // Матрица поворота билборда
    mat3 billboardMatrix=mat3(right,up,-lookDir);
    
    // Поворачиваем вершины плоскости к камере
    vec3 rotatedPosition=billboardMatrix*position;
    
    // Итоговая позиция
    vec4 mvPosition=modelViewMatrix*vec4(instancePosition+rotatedPosition,1.);
    gl_Position=projectionMatrix*mvPosition;
    
    // Передаем цвет экземпляра
    vColor=instanceColor;
}