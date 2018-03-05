<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Users_model extends CI_Model {

	public $usersTable = 'mem_profile';
	public $accountsTable = 'mem_accounts';

	function getUsers() {
		$getUsers = $this->db->select("
			user_id AS id,
			CONCAT(user_firstname, ' ', user_lastname) AS fullName,
			DATE_FORMAT(user_date_added, '%M %d %Y %H:%i:%s') AS dateAdded,
			user_status AS status
		")
		->where('user_status' , 1)
		->from($this->usersTable)
		->get()
		->result();
		foreach($getUsers as $users) {
			$rows[] = $users;
		}
		echo json_encode($rows);
	}

	function getUsersArchives() {
		$getUsersArchives = $this->db->select("
			user_id AS id,
			CONCAT(user_firstname, ' ', user_lastname) AS fullName,
			DATE_FORMAT(user_date_added, '%M %d %Y %H:%i:%s') AS dateAdded,
			user_status AS status
		")
		->where('user_status' , 0)
		->from($this->usersTable)
		->get()
		->result();
		foreach($getUsersArchives as $users) {
			$rows[] = $users;
		}
		echo json_encode($rows);
	}

	function getUserById($id) {
		$getUserById = $this->db
			->select("
				user_id AS id,
				CONCAT(user_firstname, ' ', user_lastname) AS fullName,
				DATE_FORMAT(user_date_added, '%M %d %Y %H:%i:%s') AS dateAdded,
				user_status AS status
			")
			->where('user_id', $id)
			->from($this->usersTable)
			->get()
			->row();
		$rows = $getUserById;
		echo json_encode($rows);
	}

	function searchMember($str) {
		$getUsers = $this->db->select("
			user_id AS id,
			CONCAT(user_firstname, ' ', user_lastname) AS fullName,
			DATE_FORMAT(user_date_added, '%M %d %Y %H:%i:%s') AS dateAdded,
			user_status AS status
		")
		->where('user_status', 1)
		->like('user_firstname' , $str)
		->or_like('user_lastname' , $str)
		->from($this->usersTable)
		->get()
		->result();
		if ($getUsers) {
			foreach($getUsers as $users) {
				$rows[] = $users;
			}
			echo json_encode($rows);
		} else {
			echo json_encode (json_decode ("{id:null}"));
		}
	}

	function searchMemberFromArchives($str) {
		$searchMemberFromArchives = $this->db->select("
			user_id AS id,
			CONCAT(user_firstname, ' ', user_lastname) AS fullName,
			DATE_FORMAT(user_date_added, '%M %d %Y %H:%i:%s') AS dateAdded,
			user_status AS status
		")
		->like('user_firstname' , $str)
		->or_like('user_lastname' , $str)
		->where('user_status', 0)
		->from($this->usersTable)
		->get()
		->result();
		if ($searchMemberFromArchives) {
			foreach($searchMemberFromArchives as $users) {
				$rows[] = $users;
			}
			echo json_encode($rows);
		} else {
			echo json_encode (json_decode ("{id:null}"));
		}
	}

	function getUserById2($id) {
		$getUserById2 = $this->db
			->select("
				user_id AS id,
				user_firstname AS firstname,
				user_lastname AS lastname,
				DATE_FORMAT(user_date_added, '%M %d %Y %H:%i:%s') AS dateAdded,
				user_status AS status
			")
			->where('user_id', $id)
			->from($this->usersTable)
			->get()
			->row();
		$rows = $getUserById2;
		echo json_encode($rows);
	}

	function editUser($formData = array()) {
		$data = [
			'user_firstname' => $formData->user_firstname,
			'user_lastname' => $formData->user_lastname
		];
		$where = [
			'user_id' => $formData->idUser
		];
		$getId = $this->db->update($this->usersTable, $data, $where);
		return $getId;
	}

	function addUser($formData = array() ) {
		$data = [
			'user_firstname' => $formData->user_firstname,
			'user_lastname' => $formData->user_lastname,
			'user_status' => 1
		];
		$addUser = $this->db->insert($this->usersTable, $data);
	}

	function deleteUser($id) {
		$data = [
			'user_status' => 0
		];
		$where = [
			'user_id' => $id
		];
		$deleteUser = $this->db->update($this->usersTable, $data, $where);
		return $deleteUser;
	}

	function login($username) {
		$login = $this->db
			->where('acct_username', $username)
			->get($this->accountsTable)
			->row();
		return $login;
	}
}
