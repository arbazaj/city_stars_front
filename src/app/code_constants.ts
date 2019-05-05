export class CodeConstants {
	public static readonly MSGS: any = {
		ERROR_MSG: 'Something went wrong. Please try again',
		LOGIN_SUCCESS: "Login successful",
		IMAGE_SIZE_ERR: 'Image needs to be less than 2MB',
		ONLY_IMAGE_UPLOAD: 'You could only upload images.'
	};

	public static readonly Roles: any = {
		USER: 'user',
		ADMIN: 'admin'
	};

	public static readonly maxImageSize = 2*1024*1024;

	public static readonly CUSTOM  = "Custom";

	public static readonly BLOG_STATUSES = ['PENDING APPROVAL', 'APPROVED', 'REJECTED'];
}