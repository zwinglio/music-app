import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate';
import { required, min, max, alpha_spaces as alphaSpaces, email, min_value as minVal, max_value as maxValue, confirmed, not_one_of as excluded } from '@vee-validate/rules';

export default {
    install(app) {
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('tos', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alphaSpaces);
        defineRule('email', email);
        defineRule('min_value', minVal);
        defineRule('max_value', maxValue);
        defineRule('password_mismatch', confirmed);
        defineRule('excluded', excluded);
        defineRule('country_excluded', excluded);

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `O campo ${ctx.field} é necessário.`,
                    min: `The ${ctx.field} field is too short.`,
                    max: `The ${ctx.field} field is too long.`,
                    alpha_spaces: `The ${ctx.field} field may only contain alphabetic characters and spaces.`,
                    email: `O ${ctx.field} deve ser um e-mail válido.`,
                    min_value: `The ${ctx.field} field must be.`,
                    max_value: `The ${ctx.field} field must be.`,
                    password_mismatch: `As senhas nao conferem`,
                    excluded: `The ${ctx.field} field is not valid.`,
                    country_excluded: `Não oferecemos serviços para o país selecionado. Por favor, selecione outro país`,
                    tos: `Você deve aceitar os termos de serviço`
                };

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The ${ctx.field} field is not valid.`;
                return message;
            }
        });
    }
}