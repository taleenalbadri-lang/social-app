import * as z from 'zod'


export const loginSchema = z.object({
  email: z.string().email('invalid email').nonempty('email is required'),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'invalid password').nonempty('password is required'),
})
