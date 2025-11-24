$(document).ready(function() {

    // ------------------- CSRF Setup -------------------
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });

    // ------------------- Toast Notifications -------------------
    function showToast(message, type = 'error') {
        const toastContainer = $('#toast-container');
        if (!toastContainer.length) return;

        let iconClass = 'fa-exclamation-circle';
        if (type === 'success') iconClass = 'fa-check-circle';
        else if (type === 'warning') iconClass = 'fa-exclamation-triangle';
        else if (type === 'info') iconClass = 'fa-info-circle';

        const toast = $(`
            <div class="toast ${type}">
                <i class="fas ${iconClass} toast-icon"></i>
                <span class="toast-message">${message}</span>
                <button class="toast-close"><i class="fas fa-times"></i></button>
            </div>
        `);

        toastContainer.append(toast);
        toast.find('.toast-close').click(() => toast.remove());
        setTimeout(() => toast.fadeOut(300, () => toast.remove()), 5000);
    }

    // ------------------- Search Users -------------------
    $('.search-bar input').on('keyup', function() {
        const query = $(this).val();
        const url = $(".search-bar").data('route');

        $.ajax({
            url: url,
            type: 'GET',
            data: { query: query },
            success: function(users) {
                let tbody = '';
                if (!Array.isArray(users) || users.length === 0) {
                    tbody = '<tr><td colspan="6" style="text-align:center">No users found</td></tr>';
                } else {
                    users.forEach(function(user) {
                        tbody += `<tr data-id="${user.id}">
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}</td>
                            <td>
                                <button class="btn btn-secondary btn-sm edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>`;
                    });
                }
                $('.users-table tbody').html(tbody);
            },
            error: function() {
                showToast('Error fetching users', 'error');
            }
        });
    });

    // ------------------- Add User -------------------
    $('#add-user-form').submit(function(e) {
        e.preventDefault();
        const form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            success: function(user) {
                const row = `<tr data-id="${user.id}">
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
                $('.users-table tbody').append(row);
                form[0].reset();
                showToast('User added successfully!', 'success');
            },
            error: function(xhr) {
                const message = xhr.responseJSON?.message || 'Unknown error';
                showToast('Error adding user: ' + message, 'error');
            }
        });
    });

    // ------------------- Delete User -------------------
    // DELETE MODAL
let deleteUrl = null;
let rowToDelete = null;

function openDeleteModal(url, row) {
    deleteUrl = url;
    rowToDelete = row;
    const modal = $('#delete-modal');
    modal.css('display', 'flex').css('opacity', 0);
    modal.animate({ opacity: 1 }, 200);
}

function closeDeleteModal() {
    deleteUrl = null;
    rowToDelete = null;
    const modal = $('#delete-modal');
    modal.animate({ opacity: 0 }, 200, function() {
        modal.css('display', 'none');
    });
}

$('#delete-close, #delete-cancel').click(closeDeleteModal);

$('#delete-form').submit(function(e){
    e.preventDefault();
    if(deleteUrl && rowToDelete) {
        $.ajax({
            url: deleteUrl,
            type: 'POST',
            data: $(this).serialize() + '&_method=DELETE',
            success: function() {
                rowToDelete.remove();
                closeDeleteModal();
                showToast('User deleted successfully!', 'success');
            },
            error: function() {
                showToast('Error deleting user', 'error');
            }
        });
    }
});

$(document).on('click', '.delete-btn', function() {
    const userId = $(this).data('id');
    const row = $(this).closest('tr');
    openDeleteModal(`/users/${userId}`, row);
});

// EDIT MODAL
function openEditModal(user) {
    $('#edit-user-id').val(user.id);
    $('#edit-name').val(user.name);
    $('#edit-email').val(user.email);
    $('#edit-phone').val(user.phone);
    $('#edit-role').val(user.role.toLowerCase());
    $('#edit-password').val('');
    const modal = $('#edit-modal');
    modal.css('display', 'flex').css('opacity', 0);
    modal.animate({ opacity: 1 }, 200);
}

function closeEditModal() {
    const modal = $('#edit-modal');
    modal.animate({ opacity: 0 }, 200, function() {
        modal.css('display', 'none');
    });
}

$('#edit-close, #edit-cancel').click(closeEditModal);

$(document).on('click', '.edit-btn', function() {
    const row = $(this).closest('tr');
    const user = {
        id: row.data('id'),
        name: row.find('td:nth-child(2)').text().trim(),
        email: row.find('td:nth-child(3)').text().trim(),
        phone: row.find('td:nth-child(4)').text().trim(),
        role: row.find('td:nth-child(5)').text().trim()
    };
    openEditModal(user);
});


});
