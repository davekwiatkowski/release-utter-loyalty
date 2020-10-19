const vert = (s: TemplateStringsArray): string => s.toString();
const frag = vert;

export const VertexShaderSource = vert`#version 300 es 
                                       #pragma vscode_glsllint_stage : vert
  in vec4 a_position;

  void main() {
    gl_Position = a_position;
  }

`;

export const FragmentShaderSource = frag`#version 300 es 
                                         #pragma vscode_glsllint_stage : frag
  precision highp float;

  uniform vec4 u_color;
  out vec4 out_color;

  void main() {
    out_color = u_color;
  }
  
`;
