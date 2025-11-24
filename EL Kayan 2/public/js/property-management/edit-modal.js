$(document).ready(function() {

    // Open edit modal
    $(document).on('click', '.edit-btn', function() {
        const row = $(this).closest('tr');
        const propertyId = row.find('td:first').text().trim();
        const category = row.find('td:nth-child(2)').text().trim();
        const location = row.find('td:nth-child(3)').text().trim();
        const priceText = row.find('td:nth-child(4)').text().replace(' EGP','').replace(/,/g,'').trim();
        const status = row.find('td:nth-child(5)').text().trim().toLowerCase();
        const userId = row.find('td:nth-child(6)').text().trim();
        const description = row.data('description') || '';
        const installmentYears = row.data('installment') || 0;

        $('#edit-property-id').val(propertyId);
        $('#edit-category').val(category);
        $('#edit-location').val(location);
        $('#edit-price').val(priceText);
        $('#edit-status').val(status);
        $('#edit-user-id').val(userId);
        $('#edit-description').val(description);
        $('#edit-installment-years').val(installmentYears);

        $('#edit-property-container').show();
    });

    // Close edit modal
    $('#edit-close, #edit-cancel').click(() => $('#edit-property-container').hide());

    // Submit edit form
    $('#edit-property-form').submit(function(e) {
        e.preventDefault();
        const propertyId = $('#edit-property-id').val();
        const formData = new FormData(this);
        formData.append('_method','PUT');

        $.ajax({
            url: `/properties/${propertyId}`,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(res){
                // تحديث الصف مباشرة
                const row = $('#properties-list tbody tr').filter(function() {
                    return $(this).find('td:first').text().trim() == propertyId;
                });

                row.find('td:nth-child(2)').text($('#edit-category').val());
                row.find('td:nth-child(3)').text($('#edit-location').val());
                row.find('td:nth-child(4)').text(Number($('#edit-price').val()).toLocaleString() + ' EGP');
                row.find('td:nth-child(5)').text($('#edit-status').val().charAt(0).toUpperCase() + $('#edit-status').val().slice(1));
                row.find('td:nth-child(6)').text($('#edit-user-id').val());
                row.data('description', $('#edit-description').val());
                row.data('installment', $('#edit-installment-years').val());

                $('#edit-property-container').hide();
            },
            error: function(xhr){
                let message = 'Error updating property';
                if(xhr.responseJSON && xhr.responseJSON.errors){
                    message += ': ' + Object.values(xhr.responseJSON.errors).flat().join(', ');
                }
                alert(message);
            }
        });
    });

});
