$(document).ready(function() {

    let deleteUrl = null;
    let rowToRemove = null;

    function openModal(url = null, row = null) {
        deleteUrl = url;
        rowToRemove = row;
        $('#modal-overlay').show();
    }

    function closeModal() {
        deleteUrl = null;
        rowToRemove = null;
        $('#modal-overlay').hide();
    }

    $('#modal-close, #modal-cancel').click(closeModal);

    $('#delete-form').submit(function(e) {
        e.preventDefault();
        if(deleteUrl) {
            $.ajax({
                url: deleteUrl,
                type: 'POST',
                data: $(this).serialize() + '&_method=DELETE',
                success: function() {
                    showToast('Property deleted successfully!', 'success');
                    if(rowToRemove) rowToRemove.remove();
                    closeModal();
                },
                error: function(xhr) {
                    showToast('Error deleting property: ' + xhr.responseText, 'error');
                }
            });
        }
    });

    $(document).on('click', '.delete-btn', function() {
        const propertyId = $(this).data('id');
        const row = $(this).closest('tr');
        openModal(`/properties/${propertyId}`, row);
    });

});
