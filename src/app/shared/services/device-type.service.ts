
export class DeviceTypeService {
  static getDeviceType(): string {
    const width = window.innerWidth;

    if (width <= 768) {
      return 'mobile';
    } else if (width <= 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }
}
