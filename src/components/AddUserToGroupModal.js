import React from 'react'

import Select, { StylesConfig } from 'react-select';

const AddUserToGroupModal = ({updateUser,setName,assignGroups,users,groups}) => {
  return (
    <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Assign Group</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <div className='modal-body'>
    <form onSubmit={(e)=>updateUser(e)}>
			<fieldset>
				<legend>Add user to group</legend>
				<div className="form-group">
					<label for="exampleInputPassword1">User</label>
					<Select options={users} getOptionLabel={(user) => user.name} getOptionValue={(user) => user.id} onChange={(val)=>setName(val)}/>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Groups</label>
					<Select isMulti options={groups} getOptionLabel={(group) => group.name} getOptionValue={(group) => group.id} onChange={(val)=>assignGroups(val)}/>
				</div>
				<div className="d-flex justify-content-between align-items-center">
					<div className="form-group d-flex justify-content-start">
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
					
				</div>
			</fieldset>
		</form>
    </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AddUserToGroupModal