import { MockEmailProvider } from "./MockProviders";

export class EmailService {
    private providers: MockEmailProvider[];
    private currentProviderIndex: number = 0;
    private rateLimitWindow: number = 1000; // 1 second rate limit
    private lastSentTime: number = 0;

    constructor(providers: MockEmailProvider[]) {
        this.providers = providers;
    }

    private async exponentialBackoff(attempt: number): Promise<void> {
        const backoffTime = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, backoffTime));
    }

    private async switchProvider(): Promise<void> {
        this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
        console.log("[EmailService] Switching to next provider...");
    }

    public async sendEmail(email: string, subject: string, body: string): Promise<boolean> {
        const currentTime = Date.now();
        if (currentTime - this.lastSentTime < this.rateLimitWindow) {
            console.log("[EmailService] Rate limit reached. Try again later.");
            return false;
        }

        this.lastSentTime = currentTime;
        let attempt = 0;

        while (attempt < 3) {
            try {
                const success = await this.providers[this.currentProviderIndex].sendEmail(email, subject, body);
                return success;
            } catch (error : unknown) {
                if (error instanceof Error) {
                    console.error(`[EmailService] Attempt ${attempt + 1} failed. Error: ${error.message}`);
                }
                else {
                    console.error(`[EmailService] Attempt ${attempt + 1} failed.  Unknown error occurred.`);
                }
                attempt++;
                await this.exponentialBackoff(attempt);
            }
        }

        await this.switchProvider();
        return this.sendEmail(email, subject, body);
    }
}
