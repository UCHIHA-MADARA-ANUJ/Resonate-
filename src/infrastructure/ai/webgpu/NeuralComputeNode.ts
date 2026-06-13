// ============================================================================
// WEBGPU NEURAL COMPUTE NODE
// Why send data to an API when you can execute tensor operations directly 
// on the user's local GPU? Zero latency. Absolute privacy.
// ============================================================================

export class NeuralComputeNode {
  private device: GPUDevice | null = null;
  private pipeline: GPUComputePipeline | null = null;

  public async initialize(): Promise<boolean> {
    if (!navigator.gpu) {
      console.warn("WebGPU not supported on this browser. Falling back to CPU WebWorkers.");
      return false;
    }

    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) return false;

      this.device = await adapter.requestDevice();

      // WGSL (WebGPU Shading Language) Shader for parallel sentiment scoring
      const shaderModule = this.device.createShaderModule({
        label: 'Lexical Tensor Compute Shader',
        code: `
          @group(0) @binding(0) var<storage, read> inputTensor: array<f32>;
          @group(0) @binding(1) var<storage, read> weights: array<f32>;
          @group(0) @binding(2) var<storage, read_write> outputTensor: array<f32>;

          @compute @workgroup_size(64)
          fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
            let index = global_id.x;
            if (index >= arrayLength(&inputTensor)) {
              return;
            }
            
            // Artificial neural operation (Sigmoid activation)
            let val = inputTensor[index] * weights[index];
            outputTensor[index] = 1.0 / (1.0 + exp(-val));
          }
        `
      });

      this.pipeline = this.device.createComputePipeline({
        label: 'Sentiment Compute Pipeline',
        layout: 'auto',
        compute: {
          module: shaderModule,
          entryPoint: 'main',
        },
      });

      return true;
    } catch (e) {
      console.error("Failed to initialize WebGPU Node", e);
      return false;
    }
  }

  public async computeSentimentTensor(inputValues: Float32Array, weightValues: Float32Array): Promise<Float32Array> {
    if (!this.device || !this.pipeline) {
      throw new Error("WebGPU compute node not initialized.");
    }

    const inputBuffer = this.device.createBuffer({
      size: inputValues.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    this.device.queue.writeBuffer(inputBuffer, 0, inputValues.buffer as ArrayBuffer);

    const weightBuffer = this.device.createBuffer({
      size: weightValues.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    this.device.queue.writeBuffer(weightBuffer, 0, weightValues.buffer as ArrayBuffer);

    const outputBuffer = this.device.createBuffer({
      size: inputValues.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const bindGroup = this.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: inputBuffer } },
        { binding: 1, resource: { buffer: weightBuffer } },
        { binding: 2, resource: { buffer: outputBuffer } },
      ],
    });

    const commandEncoder = this.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(this.pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(inputValues.length / 64));
    passEncoder.end();

    const readBuffer = this.device.createBuffer({
      size: inputValues.byteLength,
      usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    commandEncoder.copyBufferToBuffer(outputBuffer, 0, readBuffer, 0, inputValues.byteLength);
    this.device.queue.submit([commandEncoder.finish()]);

    await readBuffer.mapAsync(GPUMapMode.READ);
    const result = new Float32Array(readBuffer.getMappedRange());
    
    // Cleanup
    const finalResult = new Float32Array(result);
    readBuffer.unmap();
    inputBuffer.destroy();
    weightBuffer.destroy();
    outputBuffer.destroy();
    readBuffer.destroy();

    return finalResult;
  }
}
