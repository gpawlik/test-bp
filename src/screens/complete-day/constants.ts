import { isWeb } from "~/utils/platform";

// 2000 for web to make it look smoother since there is no a fade transition
export const REDIRECTION_DELAY = isWeb ? 2000 : 1000;
