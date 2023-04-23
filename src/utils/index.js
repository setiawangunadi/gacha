const mapGachaToModel = ({
    id,
    name,
    url_photo,
    position,
    number,
    is_get,
    total_get,
    created_at,
    updated_at,
}) => ({
    id,
    name,
    url_photo,
    position,
    number,
    is_get,
    total_get,
    createdAt: created_at,
    updatedAt: updated_at,
});

module.exports = { mapGachaToModel };