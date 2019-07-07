<?php
	add_action( 'wp_ajax_nopriv_login', function() {

		if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
	    	$request = ( object ) json_decode( file_get_contents('php://input'), true);

			if ( !isset( $request->login_nonce ) or !wp_verify_nonce( $request->login_nonce, 'front_login_nonce' ) ) :
				
				$json = [
					'result' => 'error',
					'message' => 'Something went wrong!',
				];

			else:
				
				$userName = empty($request->username) ? null : sanitize_text_field( $request->username );
				$passWord = empty($request->password) ? null : sanitize_text_field( $request->password );

				if( $userName == null OR $password == null ) :

					$json = [
						'result' => 'error',
						'msg' => 'Provide required details!'
					];

				else :

					$creds = [
						'user_login' => $userName ,
						'user_password' => $passWord
					];

					$user = wp_signon( $creds, FALSE );

					if ( !is_wp_error( $user ) ) :

						$pageRedirectedTo = get_page_by_path( 'home' );

						$json = [
							'result' => 'success',
							'redirect' => get_permalink( $pageRedirectedTo->ID ),
						];

					else :
						$json = [
							'result' => 'error',
							'msg' => 'Username/Password incorrect',
						];

					endif;

				endif;
			endif;

		} else {

			$json = [
				'result' => '',
				'msg' => 'Looks like an empty form'
			];
		}

	    echo json_encode( $json, JSON_PRETTY_PRINT );

	    wp_die();
	});
