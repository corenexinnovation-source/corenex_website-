
async function testContact() {
    console.log('Testing contact API with valid data...');
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'This is a test message with more than ten characters.'
            }),
        });
        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testContact();
