SecureForm.Js
=============

Simple client side form validation in Javascript. 

###Dependencies

Secureform.js requires jQuery http://jquery.com/ , and underscore.js http://underscorejs.org/

###Example

http://www.optdesign.co.uk/secure-form

##Features

SecureForm.js can be used to validate the following types of form input: 

* ***Required fields***
* ***Fields that must match*** e.g password/email confirmation 
* ***Email address syntax validation***
* ***Check box confirmation*** - e.g user must tick terms and conditions check box

Additional features include:

* ***Basic bot prevention***- security code generation & validation
* ***Error box*** - display errors in form input to user to assist them in filling it out correctly 
* ***Colour Coding*** Turn text fields a different colour when submitted with errors depending on the type of error - customisable.

##Usage

SecureForm.js has a set of default ids/classes that when applied to the relating elements in your form, will work out of the box with no configuration - however you can also customise it to work with your own chosen class/ids. Each element can have multiple SecureForm.js classes.

####Default Elements

* `<form>`:                    #secureForm
* Required `<input>`:          .sf-required
* Comparison `<input>`:        .sf-comparison
* Email validation `<input>`:  .sf-email
* Security code container:   #sf-insert-captcha
* Secutiry code `<input>`':     #sf-captcha
* Error box container:       #sf-error-box 

Example form using SecureForm.js: 

```
<main>
  <aside id="sf-error-box"></aside>
  <form method="post" id="secureForm" action="thanks.php">
      <ul class="example-form">
          <li>
              <label for="name">Name*: </label> 
              <input type="text" name="name" data-label="Your Name" class="sf-required" />
          </li>
          <li>
              <label for="email">Email*: </label> 
              <input type="text" name="email" data-label="Your Email" class="sf-required sf-email" />
          </li>
          <li>
              <label for="phone">Phone: </label> 
              <input type="text" name="phone" />
          </li>
            <li>
                <label for="username">Username*: </label> 
                <input type="text" name="username" data-label="Your Username:" class="sf-required" />
            </li>
            <li>
                <label for="password1">Password*: </label> 
                <input type="password" name="password1" data-label="Your Password" class="sf-required sf-compare" />
            </li>
            <li>
                <label for="password2"><small>confirm</small> Password*: </label> 
                <input type="password" name="password2" data-label="Password Confirmation" class="sf-required sf-compare" />
            </li>
            <li class="instruction">
                <p>
                    For security purposes enter the following code into the security code box: <span id="sf-insert-captcha"> </span>:
                </p>
            </li>
            <li>
                <label for="captcha">Security Code: </label> <input type="text" name="Security Code" id="sf-captcha" class="sf-required" />
            </li>
            <li class="line"></li>
            <li class="confirmation">
                <label for="confirmation"> Confirm something: </label> <input type="checkbox" data-label="A Confirmation" name="confirm_one" class="sf-confirm" />
            </li>
            <li class="submit">
                <input type="submit" value="Submit" />
            </li>
        </ul>
    </form>
    
</main>
```

####Errors 

Use data-label to include the name of the form element when an error is found. 

```
<input type="text" name="username" data-label="Your Username" class="sf-required" />
```

This example input is a required (`.sf-required`) field, left empty SecureForm.js will display the following error to the user in `#sf-error-box`:

***The following are required fields:*** Your Username

The actual error message isn't configurable, although if desired you could edit the hard coded error message in the correlating module in js/modules and re build. 

Using the error box is optional, simply don't include a `#sf-error-box` container if you don't want to use that feature.

Another form of error indication SecureForm.js uses is colour coded error colours applied to `<input>` fields when errors are found. You can select what colours to use for each errors in css/secureForm.css; the defaults are as such:

```
.sf-required-error{
  background:red;
}
.sf-captcha-error {
  background:blue;
}
.sf-email-error {
  background:purple;
}
.sf-comparison-error {
  background:yellow;
}
.sf-confirm-error {
  border:1px solid red;
}
```

These error classes are applied to the input field when an error is found relating to that field. You could of course use these to apply any type of style to the element other than just colours/borders.

###Options

You can set options using:

```
secureForm.options({
  //key value options
});
```

####Custom Elements 

The default elements are stored in an object, that you can modify using:


```
secureForm.options({
  elements: {
    'required':'.my-required-field'
  }
});
```

The above example will alter SecureForm.js to take `.my-required-fields` class to identify required fields rather than the default `.sf-required`. Below is the elements objects showing the keys to use to override the defaults:

```
secureForm.elements = {	

	form:          '#secureForm',
	required:	     '.sf-required',
	insertCaptcha: '#sf-insert-captcha',
	captcha:       '#sf-captcha',
	errorBox:      '#sf-error-box',
	comparison:    '.sf-compare',
	email:         '.sf-email',
	confirm:       '.sf-confirm',
	
};
```
Although you can alter the name of the class/id - classes must remain classes and ids should remain ids - else you may recieve unexpected behavior. 


