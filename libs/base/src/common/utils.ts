export class Utils {
  static killGracefully(): void {
    process.kill(process.pid, 'SIGTERM');

    setTimeout(() => {
      process.exit(1);
    }, 3000);
  }

  static killProcess(): void {
    setTimeout(() => process.kill(process.pid, 'SIGTERM'), 100);
    if (process.env.NODE_ENV !== 'test') {
      setTimeout(() => process.kill(process.pid, 'SIGTERM'), 5000);
      setTimeout(() => process.kill(process.pid, 'SIGKILL'), 10000);
    }
  }
}
