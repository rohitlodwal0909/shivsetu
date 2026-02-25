import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { loginUser } from 'src/features/authentication/AuthenticationSlice';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { AppDispatch } from 'src/store';

interface FormDataType {
  email: string;
  password: string;
}

const AuthLogin = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormDataType>>({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /* 🔹 Input Change */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* 🔹 Validation */
  const validateForm = () => {
    const newErrors: Partial<FormDataType> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 🔹 Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const data = await dispatch(loginUser(formData)).unwrap();

      toast.success(data?.message || 'Login successful');
      const user = JSON.stringify(data.user);
      const token = data.token;
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error: any) {
      const errorMsg = error?.message;
      toast.error(errorMsg);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="mb-4">
        <Label htmlFor="email" value="Email" />
        <TextInput
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sizing="md"
          color={errors.email ? 'failure' : 'gray'}
          helperText={errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <Label htmlFor="password" value="Password" />
        <div className="relative">
          <TextInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            sizing="md"
            color={errors.password ? 'failure' : 'gray'}
          />

          <div
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </div>
        </div>

        {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
      </div>

      {/* Remember & Forgot */}
      <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="opacity-90 font-normal cursor-pointer">
            Remember this Device
          </Label>
        </div>

        <Link to="/admin/forgot-password" className="text-primary text-sm font-medium">
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <Button color="primary" type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
};

export default AuthLogin;
