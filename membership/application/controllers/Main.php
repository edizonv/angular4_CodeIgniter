<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	function __construct() {
		parent:: __construct();
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header('Access-Control-Allow-Methods: GET, POST, PUT');
		$this->load->model('Users_model');
	}

	function getUsers() {
		$getUsers = $this->Users_model->getUsers();
		print_r($getUsers);
	}

	function getUsersArchives() {
		$getUsersArchives = $this->Users_model->getUsersArchives();
		print_r($getUsersArchives);
	}

	function getUserById($id) {
		$getUserById =  $this->Users_model->getUserById($id);
		print_r($getUserById);
	}

	function getUserById2($id) {
		$getUserById2 =  $this->Users_model->getUserById2($id);
		print_r($getUserById2);
	}

	function editUser() {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		if ($request)
		$editUser = $this->Users_model->editUser($request, $request->idUser);
	}

	function addUser() {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		if ($request)
		$addUser = $this->Users_model->addUser($request);
	}

	function deleteUser() {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		if ($request)
		$this->Users_model->deleteUser($request);
	}

	function login() {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);

		$username = $request->acct_username;
		$password = $request->acct_password;

		$login = $this->Users_model->login($username);
		if ($login && $username == $login->acct_username) {
			if (password_verify($password, $login->acct_password) ) {
				echo "success";
			}
		} else {
			echo "invalid user";
		}
	}

	function searchMember($str) {
		$res = $this->Users_model->searchMember($str);
		print_r($res);
	}

	function searchMemberFromArchives($str) {
		$searchMemberFromArchives = $this->Users_model->searchMemberFromArchives($str);
		print_r($searchMemberFromArchives);
	}
}
