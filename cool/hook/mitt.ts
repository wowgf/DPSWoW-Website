import Mitt, { type Emitter } from "mitt";

const mitt: Emitter<any> = Mitt();

export function useMitt() {
	return mitt;
}
