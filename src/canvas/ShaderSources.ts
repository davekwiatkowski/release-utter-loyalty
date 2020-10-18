const vert = (tsa: TemplateStringsArray) => tsa;
const frag = (tsa: TemplateStringsArray) => tsa;

export const VertexShaderSource = vert`#version 300 es 
  #pragma vscode_glsllint_stage : vert

  in vec4 a_position;

  void main() {
    gl_Position = a_position;
  }
`;

export const FragmentShaderSource = frag`#version 300 es
  #pragma vscode_glsllint_stage : frag

  // fragment shaders don't have a default precision so we need
  // to pick one. highp is a good default. It means "high precision"
  precision highp float;

  // we need to declare an output for the fragment shader
  out vec4 outColor;

  void main() {
    outColor = vec4(1, 0, 0.5, 1);
  }
`;
