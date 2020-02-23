import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import CancellationMail from '../app/jobs/CancellationMail';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    // Cada serviço tem a sua fila especifica
    this.queues = {};

    this.init();
  }

  // Cria as filas e adiciona as ações de cada uma
  init() {
    // Optei pelo foreach pela não necessidade de retorno
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Coloca o job especifico dentro de uma fila(redis) determinada
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Processa o job na fila em background
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED `, err);
  }
}
export default new Queue();
