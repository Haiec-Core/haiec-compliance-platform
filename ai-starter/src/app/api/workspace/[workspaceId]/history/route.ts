import { getChatsByWorkspaceId } from '@/data/user/chat';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { searchParams } = request.nextUrl;

  const limit = parseInt(searchParams.get('limit') || '10');
  const startingAfter = searchParams.get('starting_after');
  const endingBefore = searchParams.get('ending_before');
  const workspaceId = params.workspaceId;

  if (!workspaceId) {
    return Response.json('Missing workspaceId', { status: 400 });
  }

  if (startingAfter && endingBefore) {
    return Response.json(
      'Only one of starting_after or ending_before can be provided!',
      { status: 400 },
    );
  }

  await serverGetLoggedInUser();
  try {
    const chats = await getChatsByWorkspaceId({
      workspaceId,
      limit,
      startingAfter,
      endingBefore,
    });

    return Response.json(chats);
  } catch (_) {
    return Response.json('Failed to fetch chats!', { status: 500 });
  }
}

