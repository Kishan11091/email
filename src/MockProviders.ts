export class MockEmailProvider {
    private successRate: number;

    constructor(successRate: number) {
        this.successRate = successRate;
    }

    sendEmail(email: string, subject: string, body: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const random = Math.random();
            setTimeout(() => {
                if (random < this.successRate) {
                    console.log(`[Provider] Email sent to ${email}`);
                    resolve(true); // Resolve the promise on success
                } else {
                    console.log(`[Provider] Failed to send email to ${email}`);
                    reject(new Error('Email send failure')); // Reject the promise on failure
                }
            }, 500); // Simulate 500ms delay for email sending
        });
    }
}
