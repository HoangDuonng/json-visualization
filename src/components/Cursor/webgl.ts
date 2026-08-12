export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: ColorRGB;
  TRANSPARENT?: boolean;
}

export interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

export interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

export interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

export function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}

export class WebGLProgramClass {
  gl: WebGLRenderingContext;
  program: WebGLProgram | null;
  uniforms: Record<string, WebGLUniformLocation | null>;

  constructor(
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader | null,
    fragmentShader: WebGLShader | null,
    createProgramFn: (v: WebGLShader | null, f: WebGLShader | null) => WebGLProgram | null,
    getUniformsFn: (p: WebGLProgram) => Record<string, WebGLUniformLocation | null>
  ) {
    this.gl = gl;
    this.program = createProgramFn(vertexShader, fragmentShader);
    this.uniforms = this.program ? getUniformsFn(this.program) : {};
  }

  bind() {
    if (this.program) this.gl.useProgram(this.program);
  }
}

export class WebGLMaterialClass {
  gl: WebGLRenderingContext;
  vertexShader: WebGLShader | null;
  fragmentShaderSource: string;
  programs: Record<number, WebGLProgram | null>;
  activeProgram: WebGLProgram | null;
  uniforms: Record<string, WebGLUniformLocation | null>;
  compileShaderFn: (type: number, source: string, keywords?: string[] | null) => WebGLShader | null;
  createProgramFn: (v: WebGLShader | null, f: WebGLShader | null) => WebGLProgram | null;
  getUniformsFn: (p: WebGLProgram) => Record<string, WebGLUniformLocation | null>;
  hashCodeFn: (s: string) => number;

  constructor(
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader | null,
    fragmentShaderSource: string,
    compileShaderFn: (
      type: number,
      source: string,
      keywords?: string[] | null
    ) => WebGLShader | null,
    createProgramFn: (v: WebGLShader | null, f: WebGLShader | null) => WebGLProgram | null,
    getUniformsFn: (p: WebGLProgram) => Record<string, WebGLUniformLocation | null>,
    hashCodeFn: (s: string) => number
  ) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.programs = {};
    this.activeProgram = null;
    this.uniforms = {};
    this.compileShaderFn = compileShaderFn;
    this.createProgramFn = createProgramFn;
    this.getUniformsFn = getUniformsFn;
    this.hashCodeFn = hashCodeFn;
  }

  setKeywords(keywords: string[]) {
    let hash = 0;
    for (const kw of keywords) {
      hash += this.hashCodeFn(kw);
    }
    let program = this.programs[hash];
    if (program == null) {
      const fragmentShader = this.compileShaderFn(
        this.gl.FRAGMENT_SHADER,
        this.fragmentShaderSource,
        keywords
      );
      program = this.createProgramFn(this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }
    if (program === this.activeProgram) return;
    if (program) {
      this.uniforms = this.getUniformsFn(program);
    }
    this.activeProgram = program;
  }

  bind() {
    if (this.activeProgram) {
      this.gl.useProgram(this.activeProgram);
    }
  }
}

export function hashCode(s: string) {
  if (!s.length) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function addKeywords(source: string, keywords: string[] | null) {
  if (!keywords) return source;
  let keywordsString = "";
  for (const keyword of keywords) {
    keywordsString += `#define ${keyword}\n`;
  }
  return keywordsString + source;
}

export function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
  keywords: string[] | null = null
): WebGLShader | null {
  const shaderSource = addKeywords(source, keywords);
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.trace(gl.getShaderInfoLog(shader));
  }
  return shader;
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader | null,
  fragmentShader: WebGLShader | null
): WebGLProgram | null {
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.trace(gl.getProgramInfoLog(program));
  }
  return program;
}

export function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram) {
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    const uniformInfo = gl.getActiveUniform(program, i);
    if (uniformInfo) {
      uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);
    }
  }
  return uniforms;
}

export function getSupportedFormat(
  gl: WebGLRenderingContext,
  internalFormat: number,
  format: number,
  type: number
) {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
      case (gl as any).R16F:
        return getSupportedFormat(gl, (gl as any).RG16F, (gl as any).RG, type);
      case (gl as any).RG16F:
        return getSupportedFormat(gl, (gl as any).RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }
  return { internalFormat, format };
}

export function supportRenderTextureFormat(
  gl: WebGLRenderingContext,
  internalFormat: number,
  format: number,
  type: number
) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status === gl.FRAMEBUFFER_COMPLETE;
}

export function getWebGLContext(canvas: HTMLCanvasElement) {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };

  let gl = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;

  if (!gl) {
    gl = (canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params)) as WebGL2RenderingContext | null;
  }

  if (!gl) {
    throw new Error("Unable to initialize WebGL.");
  }

  const isWebGL2 = "drawBuffers" in gl;

  let supportLinearFiltering = false;
  let halfFloat;

  if (isWebGL2) {
    (gl as WebGL2RenderingContext).getExtension("EXT_color_buffer_float");
    supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension(
      "OES_texture_float_linear"
    );
  } else {
    halfFloat = gl.getExtension("OES_texture_half_float");
    supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
  }

  gl.clearColor(0, 0, 0, 1);

  const halfFloatTexType = isWebGL2
    ? (gl as WebGL2RenderingContext).HALF_FLOAT
    : (halfFloat && (halfFloat as any).HALF_FLOAT_OES) || 0;

  let formatRGBA: any;
  let formatRG: any;
  let formatR: any;

  if (isWebGL2) {
    formatRGBA = getSupportedFormat(
      gl,
      (gl as WebGL2RenderingContext).RGBA16F,
      gl.RGBA,
      halfFloatTexType
    );
    formatRG = getSupportedFormat(
      gl,
      (gl as WebGL2RenderingContext).RG16F,
      (gl as WebGL2RenderingContext).RG,
      halfFloatTexType
    );
    formatR = getSupportedFormat(
      gl,
      (gl as WebGL2RenderingContext).R16F,
      (gl as WebGL2RenderingContext).RED,
      halfFloatTexType
    );
  } else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  }

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering,
    },
  };
}
