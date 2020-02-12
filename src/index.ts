class Color3 {
  constructor(public r: number, public g: number, public b: number) {}
}
const color3 = (r: number, g: number, b: number) => new Color3(r, g, b);

const DOMAIN_START_X = -2.5;
const DOMAIN_END_X = 1;
const DOMAIN_START_Y = -1;
const DOMAIN_END_Y = 1;
const MAX_ITERATIONS = 512;
const MAX_ITERATIONS_LOG = Math.log(MAX_ITERATIONS);

const resizeCanvas = (canvas: HTMLCanvasElement): void => {
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
};

const scaleDomain = (startD1: number, endD1: number, startD2: number, endD2: number, value: number) => {
  const magD1 = endD1 - startD1;
  const magD2 = endD2 - startD2;

  const scale = (value - startD1) / magD1;

  return startD2 + magD2 * scale;
};

const mandelbrotCheck = (x0: number, y0: number): number | null => {
  let i = 0;
  let x = 0;
  let y = 0;

  while (i < MAX_ITERATIONS) {
    const xTmp = x * x - y * y + x0;
    y = 2 * x * y + y0;
    x = xTmp;

    if (x * x + y * y > 4) {
      return i;
    }

    i = i + 1;
  }

  return null;
};

const mandelbrotColor = (check: number | null): Color3 => {
  if (check === null) {
    return color3(0, 0, 0);
  } else {
    const checkSmoothed = scaleDomain(0, MAX_ITERATIONS_LOG, 0, 255, Math.log(check + 1));
    return color3(checkSmoothed, checkSmoothed, checkSmoothed);
  }
};

const mandelbrotPixels = function*(width: number, height: number) {
  let i = 0;
  const pixelCount = width * height;

  while (i < pixelCount) {
    const pixY = Math.floor(i / width);
    const pixX = i - pixY * width;

    const scaledX = scaleDomain(0, width - 1, DOMAIN_START_X, DOMAIN_END_X, pixX);
    const scaledY = scaleDomain(0, height - 1, DOMAIN_START_Y, DOMAIN_END_Y, pixY);

    const check = mandelbrotCheck(scaledX, scaledY);
    const color = mandelbrotColor(check);

    yield color.r;
    yield color.g;
    yield color.b;
    yield 255;
    i = i + 1;
  }
};

const main = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  resizeCanvas(canvas);

  const image = Uint8ClampedArray.from(mandelbrotPixels(canvas.width, canvas.height));

  const imageData = new ImageData(image, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);
};

window.onload = main;
