import { EmailService } from "./EmailService";
import { MockEmailProvider } from "./MockProviders";

async function main() {
    const provider1 = new MockEmailProvider(0.6); // 60% success rate
    const provider2 = new MockEmailProvider(0.8); // 80% success rate

    const emailService = new EmailService([provider1, provider2]);

    try {
        const result = await emailService.sendEmail(
            "user@example.com",
            "Test Subject",
            "Test Body"
        );
        console.log(`[Main] Email sent successfully: ${result}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`[Main] Email failed: ${error.message}`);
        }
        else {
            console.error(`[Main] Email failed: Unknown error occurred.`);
        }
    }
}

main();
