from django.shortcuts import render

# Create your views here.

# // @router  GET api/profile/me
# // @desc    Get current users profile
# // @access  Private access with tokens


# // @router  POST api/profile
# // @desc    Create or update user profile
# // @access  Private access with tokens


# // @route GET api/profile
# // @desc Get all profiles using find() method by mongoose
# // @access Public (no auth middleware)

# // @route GET api/profile/user/:user_id
# // @desc Get profile by user ID using params
# // @access Public (no auth middleware)

# // @route DELETE api/profile
# // @desc Delete profile, user & posts
# // @access Private