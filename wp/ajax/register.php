<?php
	add_action( 'wp_ajax_nopriv_register', function() {

		if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

			$request = ( object ) json_decode( file_get_contents('php://input'), true);

			if ( !isset( $request->register_nonce ) or !wp_verify_nonce( $request->register_nonce, 'front_register_nonce' ) ) :
				
				$json = [
					'result' => 'error',
					'message' => 'Something went wrong!',
				];

			else:

				$userName = !empty($request->username) ? sanitize_text_field($request->username) : null;
				$firstName = !empty($request->firstname) ? sanitize_text_field($request->firstname) : null;
				$lastName = !empty($request->lastname) ? sanitize_text_field($request->lastname) : null;
				$email = !empty($request->email) ? sanitize_text_field($request->email) : null;
				$password = !empty($request->password) ? wp_hash_password(sanitize_text_field($request->password)) : null;

				if($userName == null OR $firstName == null OR $lastName == null OR $email == null OR $password == null ) :
					
					$json = [
						'result' => 'error',
						'msg' => 'Provide required information!'
					];
				
				else:

					if(username_exists($userName) == false AND email_exists($email) == false) :
						
						$json = [
							'result' => 'error',
							'msg' => 'User already registered.'
						];

					else:

						$userData = [
							'user_login'  =>  $userName,
							'first_name'  =>  $firstName,
							'last_name'   =>  $lastName,
							'user_email'  =>  $email,
							'user_pass'   =>  $password,
						];

						$user_id = wp_insert_user($userdat) ;

						//On success
						if ( ! is_wp_error($user_id) ) {

							update_user_meta($user_id,'tos_agreed',1);

							$json = [
								'result' => 'success',
								'user' => $user_id
							];
							
						} else {

							$json = [
								'result' => 'error',
								'msg' => 'Registration failure. Try again, later',
							];   
						}

					endif;
				endif;
			endif;

		} else {
			$json = [
				'result' => 'error',
				'msg' => 'Empty form'
			];
		}

	    echo json_encode( $json, JSON_PRETTY_PRINT );

	    wp_die();
	});
