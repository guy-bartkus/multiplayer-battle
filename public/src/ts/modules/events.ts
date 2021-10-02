export class Blah extends EventTarget {
    blah() {
        this.dispatchEvent(new Event('bruh'));
    }
}