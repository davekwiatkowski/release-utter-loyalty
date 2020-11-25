const vert = (s: TemplateStringsArray): string => s.toString();
const frag = vert;

export const VertexShaderSource = vert`#version 300 es 
                                       #pragma vscode_glsllint_stage : vert
  in vec4 a_position;
  in vec4 a_color;

  uniform mat4 u_mvpMatrix;

  out vec4 v_color;

  void main() {
    gl_Position = u_mvpMatrix * vec4(a_position.xyz, 1.0);
    v_color = vec4(a_color.xyz, 1.0);
  }

`;

export const FragmentShaderSource = frag`#version 300 es 
                                         #pragma vscode_glsllint_stage : frag
  precision highp float;

  in vec4 v_color;
  
  out vec4 out_color;

  void main() {
    out_color = v_color;
  }
  
`;
