import { EmailService } from "../src/EmailService";
import { MockEmailProvider } from "../src/MockProviders";

describe("EmailService", () => {
    let emailService: EmailService;
    let provider1: MockEmailProvider;
    let provider2: MockEmailProvider;

    beforeEach(() => {
        // Mock providers with different success rates
        provider1 = new MockEmailProvider(0.5); // 50% success rate
        provider2 = new MockEmailProvider(0.9); // 90% success rate
        emailService = new EmailService([provider1, provider2]);
    });

    it("should send email successfully on the first attempt", async () => {
        const result = await emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        expect(result).toBe(true); // Expect successful email sending
    });

    it("should retry and send email after failure", async () => {
        provider1 = new MockEmailProvider(0); // Mock provider always fails
        emailService = new EmailService([provider1, provider2]);

        const result = await emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        expect(result).toBe(true); // Expect success after retrying
    });

    it("should respect rate limiting", async () => {
        emailService["lastSentTime"] = Date.now() - 500; // Simulate recent email send
        const result = await emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        expect(result).toBe(false); // Expect rate limit to block sending
    });
});
