import * as z from 'zod'

// zod 

export const registerSchema = z.object({
  // كل حاجة الديفلت بتاعها required ولو بدناش اياها هيك بنكتب optionsional
  name: z.string().min(2,'min 2 chars').max(10,'max 10 chars').nonempty('name is required'),
  email: z.string().email('invalid email').nonempty('email is required'),
  dateOfBirth: z.string().nonempty('date of birth is required'),
  // dateOfBirth: z.coerce.date().transform((val)=>{
  // return (new Date().getFullYear() - val.getFullYear() >=16) ? true : false
  // },'age must be 16 or above').refine(val => val === true, 'you must be at least 16 years old'), // اذا بدي اعمل عمليات
  // age: z.coerce.number(),
  gender: z.enum(['female', 'male']),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'invalid password').nonempty('password is required'),
  rePassword: z.string().nonempty('confirm password is required'),
}).refine((val)=> val.password === val.rePassword, {
  message: 'passwords do not match',
  path: ['rePassword']
})
