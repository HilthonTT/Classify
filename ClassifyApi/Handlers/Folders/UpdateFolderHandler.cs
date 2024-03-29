﻿using ClassifyApi.Commands.Folders;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Folders;

public class UpdateFolderHandler : IRequestHandler<UpdateFolderCommand, Folder?>
{
    private readonly IFolderData _folderData;
    private readonly IActivityLogData _activityLogData;
    private readonly ITagData _tagData;

    public UpdateFolderHandler(
        IFolderData folderData,
        IActivityLogData activityLogData,
        ITagData tagData)
    {
        _folderData = folderData;
        _activityLogData = activityLogData;
        _tagData = tagData;
    }

    public async Task<Folder?> Handle(UpdateFolderCommand request, CancellationToken cancellationToken)
    {
        Folder? folder = await _folderData.GetFolderByIdAsync(request.Id);
        if (folder is null || folder.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        if (request.TagId is not null)
        {
            Tag? tag = await _tagData.GetTagAsync(request.TagId.Value);
            folder.Tag = tag;
        }

        folder.Name = request.Name ?? folder.Name;
        folder.Notes = request.Notes ?? folder.Notes;
        folder.Deleted = request.Deleted ?? folder.Deleted;

        Folder updatedFolder = await _folderData.UpdateFolderAsync(folder);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId,
            EntityId = updatedFolder.Id,
            EntityType = EntityType.Folder,
            Action = Action.Update,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} updated folder \"{updatedFolder.Name}\"",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return folder;
    }
}
