export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateDateOfBirth = (dateOfBirth: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) return false;

    const date = new Date(dateOfBirth);
    const currentDate = new Date();
    return date < currentDate; // Data de nascimento deve ser no passado
};
